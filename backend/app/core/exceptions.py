from fastapi import HTTPException

class CredentialsException(HTTPException):
    def __init__(self, detail: str):
        super().__init__(status_code=401, detail=detail)

class NotFoundException(HTTPException):
    def __init__(self, detail: str):
        super().__init__(status_code=404, detail=detail)