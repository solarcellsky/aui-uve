RUNTIME_ERROR_CODE = 20000
VALIDATION_ERROR_CODE = 20001
AUTH_ERROR_CODE = 20002
INTERNAL_EXCEPTION = 20003
NOT_FOUND_ERROR_CODE = 20004
UPLOAD_NOT_ALLOW_CODE = 20005
EXISTED_ERROR_CODE = 20006

TASK_REPETITIVE_ERROR_CODE = 20007
TASK_INEXISTENCE_ERROR_CODE = 20008 
STATUS_ERROR_CODE = 20009
CONTRAST_ERROR = 20010
BIZ_ERROR_CODE = 30000


class BaseError(Exception):
    def __init__(self, code, message):
        Exception.__init__(self)
        self.code = code
        self.message = message

    def to_dict(self):
        rv = dict()
        rv['code'] = self.code
        rv['message'] = self.message
        return rv


class ValidationError(BaseError):
    def __init__(self, errors):
        self.code = VALIDATION_ERROR_CODE
        print(errors)
        items = {",".join(messages) for k, messages in errors.items()}
        self.message = ",".join(items)


class AuthError(BaseError):
    def __init__(self, message):
        self.code = AUTH_ERROR_CODE
        self.message = message


class CustomValidationError(BaseError):
    def __init__(self, message):
        self.code = VALIDATION_ERROR_CODE
        self.message = message


class InternalException(BaseError):
    def __init__(self, e):
        self.code = INTERNAL_EXCEPTION
        self.message = str(e)


class NotFoundError(BaseError):
    def __init__(self):
        self.code = NOT_FOUND_ERROR_CODE
        self.message = 'not found'


class UploadNotAllowError(BaseError):
    def __init__(self):
        self.code = UPLOAD_NOT_ALLOW_CODE
        self.message = 'upload not allow'


class ExistedError(BaseError):
    def __init__(self, attr):
        self.code = EXISTED_ERROR_CODE
        self.message = '%s已存在' % attr


class RuntimeError(BaseError):
    def __init__(self, msg):
        self.code = RUNTIME_ERROR_CODE
        self.message = msg


class RepetitiveError(BaseError):
    def __init__(self, msg):
        self.code = TASK_REPETITIVE_ERROR_CODE
        self.message = msg


class InexistenceError(BaseError):
    def __init__(self, msg):
        self.code = TASK_INEXISTENCE_ERROR_CODE
        self.message = msg


class StatusError(BaseError):
    def __init__(self, msg):
        self.code = STATUS_ERROR_CODE
        self.message = msg


class ContrastError(BaseError):
    def __init__(self, msg):
        self.code = CONTRAST_ERROR
        self.message = msg


class BizError(BaseError):
    def __init__(self, message):
        self.code = BIZ_ERROR_CODE
        self.message = message