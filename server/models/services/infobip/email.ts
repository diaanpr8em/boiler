export type FullyFeaturedEmail = {
    from: string,
    to: string,
    cc: string,
    bcc: string,
    subject: string,
    text: string,
    html: string,
    ampHtml: string,
    templateId: string,
    attachment: string[],
    bulkId: string,
    intermediateReport: string,
    defaultPlaceholders: string,
    notifyUrl: string,
    notifyContentyType: string,
    callbackData: string
}
