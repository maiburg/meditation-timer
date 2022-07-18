export class Utils {
  static formateDate(date: Date | string): Date | undefined {
    return date ? new Date(date) : undefined;
  }
}
