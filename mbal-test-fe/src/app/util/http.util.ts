import { HttpConst } from '../constant/http.const';

export class HttpUtil {
  /**
   *
   * @param param
   * @param auth
   *
   */
  public static buildGetOption(param?: any, auth?: boolean, contentType: string = HttpConst.HTTP_CONTENT_TYPE_JSON): any {
    const doOption = {
      headers: this.buildHeader(auth, contentType),
      param: param,
    };

    return doOption;
  }

  /**
   *
   * @param param
   * @param auth
   *
   */
  public static buildPostOption(auth?: boolean, contentType: string = HttpConst.HTTP_CONTENT_TYPE_JSON): any {
    const doOption = {
      headers: this.buildHeader(auth, contentType),
    };

    return doOption;
  }

  /**
   * @description build http header
   * @example
   *  return
   *  {
   *    'Content-Type': 'application/json;charset=utf-8'
   *    'Accept-Language': 'en-US'
   *    'Authorization' : 'jwt'
   *  }
   * @param auth
   *  If authen is true, the 'Authorization' header parameter is included.
   * @param contentType
   *
   */
  public static buildHeader(auth?: boolean, contentType: string = HttpConst.HTTP_CONTENT_TYPE_JSON): any {
    const doHeader: any = {
      'Content-Type': contentType,
      'Accept-Language': HttpConst.HTTP_ACCEPT_LANGUAGE.enUS,
    };

    //TODO: handle auth

    return doHeader;
  }
}
