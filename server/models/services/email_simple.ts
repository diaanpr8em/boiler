export type EmailMessage = {
    from: string,
    to: string[],
    cc: string[],
    bcc: string[],
    subject: string,
    text: string | undefined,
    html: string | undefined,
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