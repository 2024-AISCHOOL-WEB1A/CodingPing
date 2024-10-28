# FastAPI 애플리케이션 진입점

# app/main.py

from fastapi import FastAPI
from pydantic import BaseModel
from app.routes import model_route  # 모델 라우트 임포트

# 예시 모델 정의
class Item(BaseModel):
    data: str

app = FastAPI()

# 엔드포인트 등록
# app.include_router(model_route.router)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is running!"}

# # POST 요청을 처리하는 엔드포인트
# @app.post("/predict")
# async def predict(item: Item):
#     # 여기에 모델 로직을 넣어 예측 수행
#     # 예시로 데이터 길이를 계산
#     prediction = len(item.data)
#     return {"prediction": prediction}