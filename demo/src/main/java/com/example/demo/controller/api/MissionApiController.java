package com.example.demo.controller.api;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.Mission;
import com.example.demo.model.form.CaptureMissionFormRequest;
import com.example.demo.model.form.MissionAddFormRequest;
import com.example.demo.model.form.MissionFormRequest;
import com.example.demo.service.CaptureMissionService;
import com.example.demo.service.MissionService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mission")
public class MissionApiController {
    private final MissionService missionService;
    private final CaptureMissionService captureMissionService;

    @GetMapping("")
    public List<Mission> getMissionAll() {
        return missionService.getMissionAll();
    }

    @GetMapping("{missionSeq}")
    public Optional<Mission> getMission(@PathVariable Integer missionSeq) {
        return missionService.getMissionByMissionSeq(missionSeq);
    }

    @PostMapping("")
    public void createMission(@Valid @RequestBody MissionAddFormRequest request) {
        missionService.createMission(request);
    }

    @PutMapping("rows")
    public void updateRows(@Valid @RequestBody Map<Long, MissionAddFormRequest> formRequest) {
        missionService.updateRows(formRequest);
    }

    @PutMapping("{seq}/image")
    public void uploadImage(@PathVariable Long seq, @RequestPart(value = "image", required = false) MultipartFile image) {
        missionService.uploadImage(seq, image);
    }

    @GetMapping("missionByType/{userSeq}/{type}")
    public List<Mission> getMissionByMissionType(@PathVariable Integer userSeq, @PathVariable String type) {
        System.out.println(userSeq);
        System.out.println(type);
        return missionService.getMissionByMissionType(userSeq, type);
    }

    @PostMapping("addMission")
    public DTO.Response addMission(@Valid @RequestBody MissionFormRequest formRequest) {
        System.out.println(formRequest.getMissionType());
        System.out.println(formRequest.getTitle());
        System.out.println(formRequest.getDescription());
        System.out.println(formRequest.getKeyword());
        System.out.println(formRequest.getPrice());
        System.out.println(formRequest.getMall());
        System.out.println(formRequest.getImage());
        System.out.println(formRequest.getDotoli());
        System.out.println(formRequest.getAnswer());
        return missionService.addMission(formRequest);
    }

    @PostMapping("answerMission/{missionSeq}/{userSeq}/{answer}")
    public DTO.Response answerMission(@PathVariable Integer missionSeq, @PathVariable Integer userSeq, @PathVariable String answer, HttpServletRequest request) {
        System.out.println(missionSeq);
        System.out.println(userSeq);
        System.out.println(answer);
        return missionService.answerMission(missionSeq, userSeq, answer, request.getRemoteAddr());
    }

    @PostMapping("pressMission/{missionSeq}/{userSeq}")
    public DTO.Response pressMission(@PathVariable Integer missionSeq, @PathVariable Integer userSeq, HttpServletRequest request) {
        return missionService.pressMission(missionSeq, userSeq, request.getRemoteAddr());
    }

    @PostMapping("captureMission")
    public DTO.Response captureMission(@Valid CaptureMissionFormRequest formRequest) {
        System.out.println(formRequest.getMissionSeq());
        System.out.println(formRequest.getUserSeq());
        System.out.println(formRequest.getImage());
        return missionService.captureMission(formRequest.getMissionSeq(), formRequest.getUserSeq(), formRequest.getImage());
    }

    @PutMapping("capture/{seq}/confirm")
    public void confirmCaptureMission(@PathVariable Long seq, @RequestParam String confirmYn) {
        captureMissionService.confirmMission(seq, confirmYn);
    }

    @PutMapping("{id}")
    public void update(@PathVariable Long id, @Valid @RequestBody MissionFormRequest formRequest) {
        missionService.updateMission(id, formRequest);
    }

    @GetMapping("getAdPopcornInfo")
    public ResponseEntity<String> getAdPopcornInfo() {
        // AdPopcorn API URL
        String apiUrl = "https://apapi-staging.adpopcorn.com/ap/v1/api/mediamix/meta?mediakey=241494633&country=KR&language=ko";

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(apiUrl, String.class);
        String responseBody = responseEntity.getBody();

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("getAdPopcornJoin/{campaignKey}/{usn}")
    public ResponseEntity<String> getAdPopcornJoin(HttpServletRequest request, @PathVariable String campaignKey, @PathVariable String usn) {
        // 클라이언트의 공인 IP 주소 가져오기
        String clientIpAddress = getClientIpAddress(request);

        // 나머지 코드는 그대로 유지
        String apiUrl = "https://apapi-staging.adpopcorn.com/ap/v1/api/mediamix/join?campaignkey=" + campaignKey + "&usn=" + usn + "&ip=" + clientIpAddress + "&mediakey=241494633&adid=00000000-0000-0000-0000-000000000001&country=KR&language=ko";

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(apiUrl, String.class);
        String responseBody = responseEntity.getBody();

        return ResponseEntity.ok(responseBody);
    }

    // 클라이언트의 공인 IP 주소 가져오는 메서드
    private String getClientIpAddress(HttpServletRequest request) {
        String clientIpAddress = request.getHeader("X-Forwarded-For");
        if (clientIpAddress == null || clientIpAddress.isEmpty() || "unknown".equalsIgnoreCase(clientIpAddress)) {
            clientIpAddress = request.getHeader("Proxy-Client-IP");
        }
        if (clientIpAddress == null || clientIpAddress.isEmpty() || "unknown".equalsIgnoreCase(clientIpAddress)) {
            clientIpAddress = request.getHeader("WL-Proxy-Client-IP");
        }
        if (clientIpAddress == null || clientIpAddress.isEmpty() || "unknown".equalsIgnoreCase(clientIpAddress)) {
            clientIpAddress = request.getRemoteAddr();
        }
        return clientIpAddress;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        missionService.deleteById(id);
    }

    @DeleteMapping("rows")
    public void deleteRows(@RequestBody List<Long> seqs) {
        missionService.deleteByIds(seqs);
    }
}
