import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";

@Controller("info")
export class InfoController {
  /**
   *
   * @example: http://localhost:3000/info
   * Use @body like this:
   * {
   *    "name": "Tony",
   *    "dob": "01/01/2000"
   * }
   */
  @Post()
  info(@Body() body: { name: string; dob: string }): boolean {
    if (body.name.startsWith("A") || body.name.startsWith("a")) {
      return true;
    }

    return false;
  }

  /**
   *
   * @example: http://localhost:3000/info/address
   * Use @body like this:
   * {
   *    "line1": "Cava Restaurant, Wall St",
   *    "line2": "Manhattan",
   *    "city": "New York",
   *    "state": "New York",
   *    "country": "United States",
   * }
   */
  @Post("/address")
  infoAddress(@Body() body: { line1: string; line2: string; city: string; state: string; country: string }): boolean {
    return true;
  }
}
