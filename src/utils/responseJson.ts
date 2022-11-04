import { HttpStatus } from '@nestjs/common'

/**
 * Custom Response Json
 * @param data  main data of the request | required
 * @param statusCode  http code that you can import from package \@nestjs/common HttpStatus | optional
 * @param message response message | optional
 *
 * @example responseJson(true, HttpStatus.OK, 'fetched')
 *
 * @returns ex: { data: true, code: 200, message: 'success' }
 */
export const responseJson = (data: any, statusCode: HttpStatus = HttpStatus.OK, message = 'success') => ({
    message,
    statusCode,
    data,
})
