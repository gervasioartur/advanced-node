import { RequiredField } from '@/application/errors'

export class RequiresStringValidator {
  constructor (
    private readonly value: string,
    private readonly fiedName: string) { }

  validate (): Error | undefined {
    if (this.value === '' || this.value === null || this.value === undefined) {
      return new RequiredField(this.fiedName)
    }
  }
}
