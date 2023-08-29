module.exports = {
  apps: [
    {
      name: "my-app", // 애플리케이션 이름
      script: "index.js", // 애플리케이션 실행 스크립트 파일
      instances: "max", // 인스턴스 수 (max로 설정하면 CPU 코어 수에 맞게 자동 조정)
      autorestart: true, // 애플리케이션 재시작 설정
      watch: false, // 파일 변경 감지 후 재시작
      max_memory_restart: "1G", // 최대 메모리 사용량을 넘을 경우 재시작
      env: {
        NODE_ENV: "production", // 환경 변수 설정 (production, development 등)
      },
    },
  ],
};
