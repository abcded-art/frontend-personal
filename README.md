# Docker ENV 이름

### 이미지 빌드 시 다음과 같은 환경 변수를 지정해 주세요.

프론트엔드 주소: FRONTEND_ADDR=[http://][addr]
(예) FRONT_ADDR="https://123.456.789.123"

백엔드 주소: BACKEND_ADDR=[http://][addr]:[port]
(예) BACKEND_ADDR="https://123.456.789.123:1234"

엘라스틱 서치 주소: ELASTICSEARCH_ADDR=[http://][addr]
(예) ELASTIC_ADDR="https://123.456.789.123"

// 삭제 된 것입니다. 디버깅용으로 남겨둡니다.

백엔드 포트: BACKEND_PORT=""

# Github 및 GitLab 커밋 및 Push 방법

## Github 커밋

### 우선 github에서 pull하기

git pull origin dev

### 로컬 git에 dev 브랜치 생성하기

(dev 브랜치가 있으면)
git checkout dev

(dev 브랜치가 없으면)
git checkout -b dev

### 원격 저장소를 dev로 설정하여 Push하기

git push origin dev

## Gitlab 커밋



# 이미지 Gitlab push

### 빌드 과정을 거친 이미지에 tag 달기

docker tag hellokyumin/quickcatch:v3.2 registry.qkcgitlab
.store/quickcatch/frontend/quickcatch:1.0

### Gitlab에 Push하기

docker push registry.qkcgitlab.store/quickcatch/frontend/quickcatch:1.0

### 위 과정을 거치지 않고 한 번에 Push하기

docker buildx build --platform linux/amd64,linux/arm64 -t registry.qkcgitlab.store/quickcatch/frontend/qkc-app-fro:5.0 --push .

# 실행 방법

bash terminal 2개 열기

1번 터미널에서 npm start

2번 터미널에서 node server.js

node server.js 실행시 ip:port 가 실행된다고 나와야함

# 도커

### 멀티플랫폼 도커 이미지 빌드 방법

docker buildx create --name [builder instance name] --driver [driver name] --use

[ex]
 docker buildx create --name multi-arch-builder --driver docker-container --use
multi-arch-builder

docker buildx build --platform linux/amd64,linux/arm64 -t hellokyumin/quickcatch:v2.0 --push .

### Docker Run 방법

포트 두 개가 필요합니다. 하나는 80번 포트로 연결시켜주는 포트, 하나는 5005번 포트로 연결시켜주는 포트입니다.
elastic search는 5005번 포트를 통해 검색을 합니다. 따라서 5005:5005로 연결해주세요.
다음은 docker run의 예시입니다.

 docker run -p 1092:80 -p 5005:5005 --name testcatch -e "BACKEND_ADDR=http://192.168.0.10:8000" -e "FRONTEND_ADDR=http://192.168.0.18" -e "ELASTICSEARCH_
ADDR=http://192.168.0.6" -itd 077c32d77a6a

# 환경변수 지정 코드

## 환경변수를 정의하는 component

### /src/config.js

환경변수를 정의하는 컴포넌트입니다. 

## 환경변수를 이용하는 component

### /server.js

lastic search 호출을 위해 사용됩니다. Image화하여 사용하려면 다음과 같이 지정해주세요.

url: `http://${elasticsearchAddr}:9200/quickcatch-broadcast/_search?pretty`



