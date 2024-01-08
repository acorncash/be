package com.example.demo.service;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.Dotoli;
import com.example.demo.model.entity.Recommend;
import com.example.demo.model.entity.Recommend.RecommendBuilder;
import com.example.demo.model.entity.User;
import com.example.demo.model.entity.User.UserBuilder;
import com.example.demo.model.form.UserBlockFormRequest;
import com.example.demo.model.form.UserFormRequest;
import com.example.demo.model.form.UserUpdateFormRequest;
import com.example.demo.repository.DotoliInterface;
import com.example.demo.repository.RecommendInterface;
import com.example.demo.repository.UserInterface;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserInterface userRepository;
    private final RecommendInterface recommendRepository;
    private final DotoliInterface dotoliRepository;

    public List<User> getAllUser() {
        return userRepository.findAllUserByDelYnAndBlockYn("N", "N");
    }

    public Optional<User> getUser(Integer userSeq) {
        return userRepository.findUserBySeqAndDelYn(userSeq, "N");
    }

    public Long getAllUserCount() {
        return userRepository.count();
    }

    public Long getTodayRegisterUserCount() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);

        return userRepository.countByCreateAtGreaterThanEqual(calendar.getTime());
    }

    public Long getBlockUserCount() {
        return userRepository.countByBlockYn("Y");
    }

    public User findById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
    }

    public User findByEmail(String email) {
        return userRepository.findByUserMail(email).orElseThrow(() -> new EntityNotFoundException("email"));
    }

    public Optional<User> getUserBySocialKeyAndUserMail(String socialKey, String userMail){
        return userRepository.findBySocialKey(socialKey);
    }

    public List<Recommend> getRecommendList(Integer userSeq){
        return recommendRepository.findRecommendByRecommendUserSeq(userSeq);
    }

    public Optional<User> getDotoliByUser(Integer userSeq) {
        return userRepository.findById(userSeq);
    }

    public List<Dotoli> getDotoliByDotoli(Integer userSeq) {
        return dotoliRepository.findByUserSeq(userSeq);
    }

    public User insert(UserFormRequest form) {
        try {
            UserBuilder builder = User.builder();

            User user = builder.socialKey(form.getSocialKey())
                            .refreshToken(form.getRefreshToken())
                            .id(form.getId())
                            .password(form.getPassword())
                            .name(form.getName())
                            .nickname(form.getName())
                            .phoneNumber(form.getPhoneNumber())
                            .userMail(form.getEmail())
                            .dotoli(0)
                            .build();

            return userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public DTO.JoinResponse Join(UserFormRequest form) {
        DTO.JoinResponse joinResponse = new DTO.JoinResponse();
        try{
            insert(form);

            joinResponse.setStatus("Success");
            return joinResponse;
        } catch (Exception e) {
            e.printStackTrace();
            joinResponse.setStatus("Fail");
            joinResponse.setMessage(e.getMessage());

            return joinResponse;
        }
    }

    public void updateRows(Map<Integer, UserUpdateFormRequest> form) {
        form.keySet().forEach(k -> {
            update(k, form.get(k));
        });
    }

    @Modifying(clearAutomatically = true)
    public void update(Integer id, UserUpdateFormRequest form) {
        try {
            User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
            
            user.setName(form.getName());
            user.setNickname(form.getNickname());
            user.setUserMail(form.getEmail());
            user.setPhoneNumber(form.getPhoneNumber());
            user.setSocialKey(form.getSocialKey());

            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void blockUser(UserBlockFormRequest request) {
        if (!request.getBlockList().isEmpty()) {
            userRepository.updateBlockStatus(request.getBlockList(), request.getBlockStatus());
        }
    }

    public void deleteById(Integer id) {
        try {
            User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

            user.setDelYn("Y");

            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public DTO.JoinResponse recommend(Integer userSeq, String email) {
        DTO.JoinResponse joinResponse = new DTO.JoinResponse();
        try {
            User user = userRepository.findById(userSeq).orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
            User recommendUser = userRepository.findByUserMail(email).orElseThrow(() -> new EntityNotFoundException(email + " 사용자를 찾을 수 없습니다."));

            if(user.getSeq() == recommendUser.getSeq()) {
                throw new EntityNotFoundException("본인 아이디입니다.");
            }

            Recommend checkRecommend = recommendRepository.findRecommendByUserSeqAndRecommendUserSeq(user.getSeq(), recommendUser.getSeq());

            if (checkRecommend != null){
                throw new EntityNotFoundException("이미 추천인을 등록하였습니다.");
            }

            addRecommendDotoli(user);
            addRecommendDotoli(recommendUser);

            RecommendBuilder builder = Recommend.builder();
            Recommend recommend = builder.userSeq(user.getSeq())
                    .recommendUserSeq(recommendUser.getSeq())
                    .userEmail(user.getUserMail())
                    .recommendUserEmail(recommendUser.getUserMail())
                    .build();

            recommendRepository.save(recommend);

            recommendUser.setRecommendCnt(recommendUser.getRecommendCnt() + 1);

            userRepository.save(recommendUser);

            joinResponse.setStatus("Success");
            return joinResponse;
        } catch (Exception e) {
            e.printStackTrace();
            joinResponse.setStatus("Fail");
            joinResponse.setMessage(e.getMessage());

            return joinResponse;
        }
    }

    public void addRecommendDotoli(User user) {
        try {
            Dotoli.DotoliBuilder builder = Dotoli.builder();

            Dotoli dotoli = builder.userSeq(user.getSeq())
                    .missionSeq(0)
                    .missionTitle("추천인 등록")
                    .missionDotoli(500)
                    .userDotoli(user.getDotoli())
                    .afterDotoli(user.getDotoli() + 500)
                    .ipAddress("")
                    .build();

            dotoliRepository.save(dotoli);

            user.setDotoli(dotoli.getAfterDotoli());

            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
