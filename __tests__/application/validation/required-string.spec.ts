import { RequiredField } from '@/application/errors'
import { RequiresStringValidator } from '@/application/validation'

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

  it('should return undefined if value is not empty', () => {
    const sut = new RequiresStringValidator('any_value', 'any_field')
    const error = sut.validate()
    expect(error).toBeUndefined()
  })
})
