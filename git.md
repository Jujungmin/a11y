## git
- GIT은 "원격저장소", "로컬저장소" , "작업폴더" 세가지가 있다.
- SVN와 차이로 SVN은 "로컬저장소"가 없다.
 
### origin / master / HEAD
- `origin`
  - 원격 저장소 경로 이름
- `master(or main)`
  - 브랜치 중에 가장 기본인 브랜치
- `HEAD`
  - 현재 어떤 작업 공간에 있는지


### pull & fetch
- `pull`과 `fetch`는 원격저장소에의 커밋을 로컬 저장소에 가져오는 역할.
- `fetch` 후 `pull` 을 하는 것을 추천.
- `fetch`
  - 원격저장소의 커밋들을 로컬저장소에 가져온다.
  - merge 과정은 발생하지 않아 로컬 저장소의 내용 변경되지 않는다.
- `pull`
  - `fetch` + `merge` 를 합친 것
  - 원격저장소에서 최신 커밋 내용을 가져와 로컬 복사본과 자동 병합
  - 자동으로 병합되어 충돌이 발생할 수 있다.

---
**reference**<br/>
https://devjino.tistory.com/300<br/>
https://www.inflearn.com/questions/27696/origin-master-head%EC%9D%98-%EC%9D%98%EB%AF%B8<br/>
https://merrily-code.tistory.com/124 <== 참고

### stash

### tag

