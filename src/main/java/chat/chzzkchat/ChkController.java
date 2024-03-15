package chat.chzzkchat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import static chat.chzzkchat.StreamerID.UIDStorage;

@Controller
@Slf4j
public class ChkController {

    String NID_AUT = "2+fhn5zgxJ7jJkT4C7aBJuqATTZwlt6VjnQVRVfjqBpVcfAjZtGbHXE78srUlXml";
    String NID_SES = "AAABqNExs+RHH79YkQc30zIqBbqT/pqbSg1UhgPQgCG9+s1WdO+92tnGl5aINAzbXZVbNfAn7q2xm+aG7tJwh6lsF5tiL4VfvcxPK3DrsCO1gJNVV6EMHJ0eNLK+G9UtLMcg0vTvt9uGcK338MYkuGodXZxAua39Tk7fb2G5/dRUeIDr+gbEKQUkYZbcf/z6OoWEduzebhArnPra6oGOUfWA/SxFjUaGcmj61skp5cA1rATXnk45no5byLeh81FyLmqzKEMjoCzZ7yVaHnwf8lz6SJebhUq/pHVEHpSzDsYFsDeGYHcn6Xh72i5tC45Fql7PHZn4rfyQMN1GmIPKIwipZ67EAGGbuGgbQ3dK4h5B9tPTCnFxA8UweA9EG0byY6ypS/lVVyrCcow0Q+e6RI85dy4ygIzYi+Dt0yWq6z7Wnz3ePYmI4G8XNY6BPKZsZi0941VgpFr/n2B/swix7HHjpw/yYMuYo/RZqLmOraTn5ukXrQ1sZ/rXxzDhvou4xxNr1V1WU4HsE5Q5om+Hdi8MXFkRN0Uy1FEw3EfLUo/bc7pCVfLXnMWKmOLQFrTRD6z28A==";


    RestTemplate restTemplate = new RestTemplate();
    ObjectMapper objectMapper = new ObjectMapper();
    private final Lock lock = new ReentrantLock();


    @GetMapping("/")
    public String home(Model model){
        Set<String> streamer = UIDStorage.keySet();
        model.addAttribute("streamers", streamer);
        return "home";
    }


    @PostMapping("/vote")
    public String vote(@RequestParam("streamer") String streamer, Model model) throws JsonProcessingException {
        Map<String, Object> result = getCID(streamer);
        boolean adult = (boolean)result.get("adult");
        String cid = (String) result.get("chatChannelId");
        String accessToken = getAccessToken(cid);
        model.addAttribute("streamer", streamer);
        model.addAttribute("tkn", accessToken);
        model.addAttribute("cid", cid);
        model.addAttribute("uid", UIDStorage.get(streamer));
        model.addAttribute("adult", adult);

        return "vote";
    }

    @GetMapping("/nonlist")
    public String nonList(){
        return "nonList";
    }

    @GetMapping("/cookie")
    public String cookie(){
        return "cookie";
    }


    @PostMapping("/register")
    @ResponseBody
    public String register(@RequestParam("streamerName") String streamerName, @RequestParam("streamerId") String streamerId){
        log.info("register");
        UIDStorage.put(streamerName, streamerId);

        return "등록되었습니다.";
    }

    @PostMapping("/cookie")
    @ResponseBody
    public String renewalCookie(@RequestParam("Aut") String Aut, @RequestParam("Ses") String Ses){
        lock.lock();
        try {
            NID_AUT = Aut;
            NID_SES = Ses;
        } finally {
            lock.unlock();
        }
        log.info("aut={} ses={}", NID_AUT, NID_SES);

        return "갱신되었습니다.";
    }

    private String getAccessToken(String cid) throws JsonProcessingException {
        String url = "https://comm-api.game.naver.com/nng_main/v1/chats/access-token?channelId="+cid+"&chatType=STREAMING";
        return objectMapper.readTree(restTemplate.getForObject(url, String.class)).get("content").get("accessToken").asText();
    }

    private Map<String, Object> getCID(String streamer) throws JsonProcessingException {
        String streamerId = UIDStorage.get(streamer);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cookie", "NID_AUT=" + NID_AUT);
        headers.add("Cookie", "NID_SES=" + NID_SES);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String cidURL = "https://api.chzzk.naver.com/polling/v1/channels/"+streamerId+"/live-status";
        JsonNode content = objectMapper.readTree(restTemplate.exchange(cidURL, HttpMethod.GET, entity, String.class).getBody()).get("content");
        Map<String, Object> result = new HashMap<>();
        boolean adult = content.get("adult").asBoolean();
        String chatChannelId = content.get("chatChannelId").asText();
        result.put("adult", adult);
        result.put("chatChannelId", chatChannelId);
        return result;
    }
}
