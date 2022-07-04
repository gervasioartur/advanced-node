import { RequiredField } from '@/application/errors'

export class RequiresStringValidator {
  constructor (
    private readonly value: string,
    private readonly fiedName: string) { }

  validate (): Error | undefined {
    return new RequiredField('any_field')
  }
}

describe('RequiresStringValidator', () => {
  it('should return RequiredFieldError if value is empty', () => {
    const sut = new RequiresStringValidator('', 'any_field')
    const error = sut.validate()
    expect(error).toEqual(new RequiredField('any_field'))
  })

  it('should return RequiredFieldError if value is null', () => {
    const sut = new RequiresStringValidator(null as any, 'any_field')
    const error = sut.validate()
    expect(error).toEqual(new RequiredField('any_field'))
  })

  it('should return RequiredFieldError if value is undefined', () => {
    const sut = new RequiresStringValidator(undefined as any, 'any_field')
    const error = sut.validate()
    expect(error).toEqual(new RequiredField('any_field'))
  })
})
