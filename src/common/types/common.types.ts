export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
    fieldsErrors: FieldErrorType[]
}

type FieldErrorType = {
    error: string
    field: string
}
