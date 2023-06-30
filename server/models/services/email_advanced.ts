export type EmailMessage = {
    from: string,
    to: Destination[],
    cc: Destination[] | undefined,
    bcc: Destination[] | undefined,
    subject: string,
    text: string,
    html: string,
    ampHtml?: string | undefined,
    templateId: number,
    attachment?: string[] | undefined,
    bulkId?: string | undefined,
    intermediateReport?: string | undefined,
    defaultPlaceholders?: string | undefined,
    notifyUrl?: string | undefined,
    notifyContentyType?: string | undefined,
    callbackData?: string | undefined
}

type Destination = {
    to: string,
    placeholders: Placeholders[]
}

type Placeholders = {
    key: string,
    value: string
}
