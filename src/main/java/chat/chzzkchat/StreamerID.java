package chat.chzzkchat;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;

@Component
public class StreamerID {
    static ConcurrentHashMap<String, String> UIDStorage = new ConcurrentHashMap<>();

    @PostConstruct
    public void store(){
        UIDStorage.put("쌍베", "dcd75ef0f2c664e3270de18696ad43bf");
        UIDStorage.put("레바", "6ab86891e07489743437594c6e4dbf3a");
        UIDStorage.put("다주", "bdc57cc4217173f0e89f63fba2f1c6e5");
        UIDStorage.put("포셔", "f39c3d74e33a81ab3080356b91bb8de5");
        UIDStorage.put("던", "dc740d5bb5680666b6bf2ebc58a8203f");
        UIDStorage.put("플러리", "fe558c6d1b8ef3206ac0bc0419f3f564");
        UIDStorage.put("얍얍", "dec8d19f0bc4be90a4e8b5d57df9c071");
        UIDStorage.put("녹두로", "6e06f5e1907f17eff543abd06cb62891");
        UIDStorage.put("마시로", "4515b179f86b67b4981e16190817c580");
        UIDStorage.put("진격캐넌", "21e1510cc1cf976ed33fa35d48837495");
        UIDStorage.put("인간젤리", "034449b176b163a705b9c0e81f7a51c2");
        UIDStorage.put("감블러", "0974bf2ded8c3e124797f7be6d1bdbb5");
        UIDStorage.put("철면수심", "c892177b4d613127d8c587e9da11d384");
        UIDStorage.put("쿠우", "861f250480408cb290bb5463e079a238");
        UIDStorage.put("플레임", "8b3e8e3a13201cff0836c69cfab62f45");
        UIDStorage.put("네클릿", "dff5fc9706f8260682ce6eb93acaad64");
        UIDStorage.put("이초홍", "ed21d36a44d1956520189a784afc27ed");
        UIDStorage.put("삼식", "1c231568d0b13de5703b3f6a5e86dc47");
        UIDStorage.put("레니아워", "0f4d9f20aa461c5da5c68e4e65d35ff9");
        UIDStorage.put("룩삼", "8803cee946a9e610a76fbdee98d98c61");
        UIDStorage.put("김뿡", "17f0cfcba4ff608de5eabb5110d134d0");
        UIDStorage.put("울프", "0b33823ac81de48d5b78a38cdbc0ab94");
        UIDStorage.put("한동숙", "75cbf189b3bb8f9f687d2aca0d0a382b");
        UIDStorage.put("강퀴", "1a1dd9ce56fb61a37ffb6f69f6d5b978");
        UIDStorage.put("옥냥이", "0d027498b18371674fac3ed17247e6b8");
        UIDStorage.put("따효니", "0dad8baf12a436f722faa8e5001c5011");
        UIDStorage.put("탬탬버린", "a7e175625fdea5a7d98428302b7aa57f");
        UIDStorage.put("러너", "19e3b97ca1bca954d1ac84cf6862e0dc");
        UIDStorage.put("강소연", "dc7fb0d085cfbbe90e11836e3b85b784");
        UIDStorage.put("김뚜띠", "2eee29ce69664154d8bc478825941259");
        UIDStorage.put("도현", "c68b8ef525fb3d2fa146344d84991753");
        UIDStorage.put("침착맨", "bb382c2c0cc9fa7c86ab3b037fb5799c");
    }
}