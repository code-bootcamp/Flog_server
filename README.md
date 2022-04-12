# :frog: Flog

## ***F***resh - ***F***riendly - ***F***ree + ***B***log

> ***Frog*** 라는 단어에서 착안한 여행기록 서비스 ***Flog***
><br/><br/>
>개구리처럼 통통 튀는 여행자들의 삶을 응원합니다.  
>우리는 우물 안 개구리가 아닌, 우물 밖 개구리의 삶을 지향합니다.  
>더 멀리, 넓은 세상으로 나가는 여행자들에게 도움이 되고자 합니다.

![기획의도](images/%EA%B8%B0%ED%9A%8D%EC%9D%98%EB%8F%84.png "기획의도")

<br/>

## 배포주소
>***[https://flog.today](https://flog.today)***

<br/>

## 기술스택
`JavaScript`, `TypeScript`, `NodeJS`, `NestJS`, `TypeORM`, `Express`, `JWT`, `GraphQL`, `MySQL`, `Axios`, `ElasticSearch`, `Logstash`, `Redis`, `Docker`, `Git`, `GitHub`, `GCP`

<br/>

## ERD
[![ERD](images/Flog_%EC%B5%9C%EC%A2%85_ERD.png "Flog ERD")](https://www.erdcloud.com/d/MTDe43ncafuQNrdwq)

<br/>

## API
<!--table-->
|api 기능|request|respose|
|--|--|--|
|Create|Mutation{API name:contents}{request col}|등록 성공 or 실패메시지|
|Update|Mutation{API name:contents}{request col}|수정 성공 or 실패메시지|
|Delete|Mutation{API name:contents}{request col}|삭제 성공 or 실패메시지|
|Fetch|Query{API name}{request col}|조회 성공 or 실패메시지|
|login/logout|Query{API name}{request col}|성공 or 실패메시지|

![](images/api_docs_1.jpg "api docs")

<br/>

## 프로젝트 설치 방법 & 실행 방법
``` bash
git clone https://github.com/code-bootcamp/F5B1-team02-server.git

yarn install
```
<br/>

## 폴더 구조
```
Flog-project
├─ .DS_Store
├─ .vscode
│  └─ settings.json
└─ F5B1-team02-server
   ├─ .dockerignore
   ├─ .env
   ├─ .eslintrc.js
   ├─ .prettierrc
   ├─ docker-compose.yaml
   ├─ Dockerfile
   ├─ elk
   │  ├─ elasticsearch
   │  ├─ kibana
   │  └─ logstash
   │     ├─ logstash.conf
   │     └─ mysql-connector-java-8.0.28.jar
   ├─ flog-project.json
   ├─ nest-cli.json
   ├─ package.json
   ├─ README.md
   ├─ src
   │  ├─ apis
   │  │  ├─ auth
   │  │  │  ├─ auth.controller.ts
   │  │  │  ├─ auth.module.ts
   │  │  │  ├─ auth.resolver.ts
   │  │  │  └─ auth.service.ts
   │  │  ├─ bannerImage
   │  │  │  ├─ bannerImage.module.ts
   │  │  │  ├─ bannerImage.resolver.ts
   │  │  │  ├─ bannerImage.service.ts
   │  │  │  └─ dto
   │  │  │     └─ updateBannerImage.input.ts
   │  │  ├─ board
   │  │  │  ├─ board.module.ts
   │  │  │  ├─ board.resolver.ts
   │  │  │  ├─ board.service.ts
   │  │  │  ├─ dto
   │  │  │  │  ├─ createBoard.input.ts
   │  │  │  │  └─ updateBoard.input.ts
   │  │  │  └─ entities
   │  │  │     └─ board.entity.ts
   │  │  ├─ budget
   │  │  │  ├─ budget.module.ts
   │  │  │  ├─ budget.resolver.ts
   │  │  │  ├─ budget.service.ts
   │  │  │  └─ entities
   │  │  │     └─ budget.entity.ts
   │  │  ├─ detailSchedule
   │  │  │  ├─ detailSchedule.module.ts
   │  │  │  ├─ detailSchedule.resolver.ts
   │  │  │  ├─ detailSchedule.service.ts
   │  │  │  ├─ dto
   │  │  │  │  ├─ createDetailSchedule.input.ts
   │  │  │  │  └─ updateDetailSchedule.input.ts
   │  │  │  └─ entities
   │  │  │     └─ detailSchedule.entity.ts
   │  │  ├─ iamport
   │  │  │  └─ iamport.service.ts
   │  │  ├─ mainCategory
   │  │  │  ├─ entities
   │  │  │  │  └─ mainCategory.entity.ts
   │  │  │  ├─ mainCategory.module.ts
   │  │  │  ├─ mainCategory.resolver.ts
   │  │  │  └─ mainCategory.service.ts
   │  │  ├─ moneyBook
   │  │  │  ├─ dto
   │  │  │  │  ├─ createMoneyBook.input.ts
   │  │  │  │  └─ updateMoneyBook.input.ts
   │  │  │  ├─ entities
   │  │  │  │  └─ moneyBook.entity.ts
   │  │  │  ├─ moneyBook.module.ts
   │  │  │  ├─ moneyBook.resolver.ts
   │  │  │  └─ moneyBook.service.ts
   │  │  ├─ pointHistory
   │  │  │  ├─ entities
   │  │  │  │  └─ pointHistory.entity.ts
   │  │  │  ├─ pointHistory.module.ts
   │  │  │  ├─ pointHistory.resolver.ts
   │  │  │  └─ pointHistory.service.ts
   │  │  ├─ pointTranscation
   │  │  │  ├─ entities
   │  │  │  │  └─ pointTransaction.entity.ts
   │  │  │  ├─ pointTransaction.module.ts
   │  │  │  ├─ pointTransaction.resolver.ts
   │  │  │  └─ pointTransaction.service.ts
   │  │  ├─ schedule
   │  │  │  ├─ dto
   │  │  │  │  └─ createSchedule.input.ts
   │  │  │  ├─ entities
   │  │  │  │  └─ schedule.entity.ts
   │  │  │  ├─ schedule.module.ts
   │  │  │  ├─ schedule.resolver.ts
   │  │  │  └─ schedule.service.ts
   │  │  ├─ sharedList
   │  │  │  ├─ sharedList.module.ts
   │  │  │  ├─ sharedList.resolver.ts
   │  │  │  └─ sharedList.service.ts
   │  │  └─ user
   │  │     ├─ dto
   │  │     │  ├─ createUser.input.ts
   │  │     │  └─ updateUser.input.ts
   │  │     ├─ entities
   │  │     │  └─ user.entity.ts
   │  │     ├─ user.module.ts
   │  │     ├─ user.resolver.ts
   │  │     └─ user.service.ts
   │  ├─ app.controller.ts
   │  ├─ app.module.ts
   │  ├─ app.service.ts
   │  ├─ common
   │  │  ├─ auth
   │  │  │  ├─ gql-auth.guard.ts
   │  │  │  ├─ gql-user.param.ts
   │  │  │  ├─ jwt-access.stategy.ts
   │  │  │  ├─ jwt-refresh.stategy.ts
   │  │  │  └─ jwt-social-google.stategy.ts
   │  │  ├─ filter
   │  │  │  └─ http-exception.filter.ts
   │  │  └─ graphql
   │  │     └─ schema.gql
   │  ├─ libraries
   │  │  └─ utils.ts
   │  └─ main.ts
   ├─ test
   │  ├─ app.e2e-spec.ts
   │  └─ jest-e2e.json
   ├─ tsconfig.build.json
   ├─ tsconfig.json
   └─ yarn.lock
```
<br/>

## .env 설정
```
ACCESS_TOKEN_KEY
REFRESH_TOKEN_KEY

GOOGLE_CLIENTID
GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL

STORAGE_BUCKET
STORAGE_KEY_FILENAME
STORAGE_PROJECT_ID

IAMPORT_API_KEY
IAMPORT_SECRET
```
<br/>

* * *

- ## 프로젝트 작업기간 및 시간
  - 작업기간 : 2022년 03월 14일 ~ 2022년 04월 04일
  - 스크럼 회의
    - 오전 10시30분
    - PR 확인, merge 여부 결정 / 당일 업무 목록 공유
  - 정규시간
    - 주중  10:00 ~ 19:00
    - 토요일 10:00 ~ 17:00
    - 이후 개인별 상황에 따라 자율적인 야간 작업
  - 데일리 리뷰
    - 주중 18:00
    - 토요일 16:00


<br/>

# :smile: BackEnd 팀원 역할
## 안지원
:email: jiwon8518@naver.com  

* `회원가입 API`, `마이페이지 API`, `여행일정 API`, `여행로그 API`, `파일 업로드 API` 생성 및 유지 보수
* DB Schema 제작
* Git 담당
* 기타 공유 문서 작업

## 유한결
:email: hgyu0830@gmail.com

* `결제 서비스(아임포트) 구현`, `여행족보 검색 기능`, `포인트 후원 API`, `가계부 API` 생성 및 유지 보수
* 트랜잭션 관리
* 배포 및 도커 관리
* 기타 공유 문서 작업