/* Here We can provide our own schema by adding up with the joi object and pass the value in it 
like 1.for error 
2.for without aurument 
3.BodyWeight 
4.LuckyNumber 
5.DOB and 
6.Heightinfeet


*/
const sinon = require('sinon')
const {expect} = require('chai');
const Joi = require('joi');
const {toJson} = require('json-joi-converter')
const {validateInput, checkResponse} = require('../../lib/MainMid');


describe('To Test validation function', () => {
	it('this is test case 1 = should check that next is called with a validation error when input data does not validate acc. to baseSchema', ()=>{
		const req = {
			'body': {
				'data': {
					'fullname': {'fname': 'Jyoti', 'lname': 'Totagi'},
					'dob': {'date': 15, 'month': 16, 'year': 1948},
					'contactnumber':	{'countrycode':'91', 'phonenumber':'9108643444'},
					'pan': 'BGRPJ0756J',
				}					
			}
		}
		const res = {}
		const nextSpy = sinon.spy()
		validateInput()(req, res, nextSpy)
		expect(nextSpy.calledOnce).to.be.true
		expect(nextSpy.firstCall.args[0]).to.be.an('error')
		expect(Joi.isError(nextSpy.firstCall.args[0])).to.be.true
	});	
	it('this is test case 2 = should check that next is called without any arguments when input data validates acc. to baseSchema', ()=>{
		const req = {
			'body': {
				'data': {
					'fullname': {'fname': 'Jyoti', 'lname': 'Totagi'},
					'dob': {'date': 14, 'month': 3, 'year': 1948},
					'contactnumber':	{'countrycode':'91', 'phonenumber':'9108643444'},
					'pan': 'BGRPJ0756J',

				}					
			}
		}
		const res = {}
		const nextSpy = sinon.spy()
		validateInput()(req, res, nextSpy)
		expect(nextSpy.calledOnce).to.be.true
		expect(nextSpy.firstCall.args[0]).to.be.undefined
	});		
	it('this is test case 3 = should check that next is called with a validation error when input data does not validate acc. to userSchema', ()=>{
		
			const req = {
			'body': {
				'data': {
					'fullname': {'fname': 'Jyoti', 'lname': 'Totagi'},
					'dob': {'date': 14, 'month': 2, 'year': 1948},
					'Bodyweight': 70,
					'contactnumber':	{'countrycode':'91', 'phonenumber':'9108643444'},
					'pan': 'BGRPJ0756J',
				},
				'schema':  toJson(
							Joi.object({
								Bodyweight: Joi.number().min(20).max(100)
							})
				)
			}
			
		}
		const res = {}
		const nextSpy = sinon.spy()
		validateInput()(req, res, nextSpy)
		expect(Joi.isError(nextSpy.firstCall.args[0])).to.be.false
		expect(nextSpy.firstCall.args[0]).to.be.undefined
	});	
	it('this is test case 4 = should check that next is called without any arguments when input data validates acc. to userSchema', ()=>{
		const req = {
			'body': {
				'data': {
					'fullname': {'fname': 'Jyoti', 'lname': 'Totagi'},
					'dob': {'date': 15, 'month': 3, 'year': 1948},
					'contactnumber':	{'countrycode':'91', 'phonenumber':'9108643444'},
					'LuckyNumber': 5,
					'pan': 'BGRPJ0756J',
				},
				'schema': toJson(
							Joi.object({
								LuckyNumber: Joi.number().min(4).max(6)
							})
				)
			}		
		}
		const res = {}
		const nextSpy = sinon.spy()
		validateInput()(req, res, nextSpy)
		expect(nextSpy.calledOnce).to.be.true
		expect(nextSpy.firstCall.args[0]).to.be.undefined
	});	
	it('this is test case 5 = should check that next is called with a validation error when input data does not validate modified baseSchema', ()=>{
		const req = {
			'body': {
				'data': {
					'fullname': {'fname': 'Jyoti', 'lname': 'Totagi'},
					'dob': {'date': 10, 'month': 12, 'year': 1994},
					'contactnumber':	{'countrycode':'91', 'phonenumber':'9108643444'},
					'email': 'jojo@gmail.com',
					'pan': 'BGRPJ0756K',
				},
				'schema': toJson(
							Joi.object({
								dob: Joi.object({		
									date: Joi.number().integer().min(1).max(31),
									month: Joi.number().integer().min(1).max(12),
									year: Joi.number().integer().max(1993),
								})
							})
				)
			}		
		}
		const res = {}
		const nextSpy = sinon.spy()
		validateInput()(req, res, nextSpy)
		expect(nextSpy.calledOnce).to.be.true
		expect(nextSpy.firstCall.args[0]).to.be.an('error')
		expect(Joi.isError(nextSpy.firstCall.args[0])).to.be.true
	});	
	it('this is test case 6 = should check that next is called without any arguments when input data validates acc. to userSchema', ()=>{
		const req = {
			'body': {
				'data': {
					'fullname': {'fname': 'Jyoti', 'lname': 'Totagi'},
					'dob': {'date': 15, 'month': 3, 'year': 1948},
					'contactnumber':	{'countrycode':'91', 'phonenumber':'9108643444'},
					'Heightinfeet': 6,
					'pan': 'BGRPJ0756J',
				},
				'schema': toJson(
							Joi.object({
								Heightinfeet: Joi.number().min(1).max(6.5)
							})
				)
			}		
		}
		const res = {}
		const nextSpy = sinon.spy()
		validateInput()(req, res, nextSpy)
		expect(nextSpy.calledOnce).to.be.true
		expect(nextSpy.firstCall.args[0]).to.be.undefined
		
	});		
	
});
