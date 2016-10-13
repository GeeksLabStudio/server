// Error classes

'use strict';

/*
  Currently useing this error class in api
*/
class ApiError extends Error {
  constructor(cs, msg, props) {
    if (msg instanceof Error || typeof msg == 'object'){
      msg = msg.message || msg.msg || '';
      super(msg)
    } else {
      super(msg);
    }

    // if CODE/STATUS exist
    if (cs){
      if (typeof cs == 'number'){
        this.code = cs;
        this.status = getStatusByCode(cs)
      }
      if (typeof cs == 'string'){
        this.status = cs;
        this.code = getCodeByStatus(cs)
      }
    }

    if (!this.code || !this.status) {
      this.code = getCodeByStatus()
      this.status = getStatusByCode()
    }

    this.name = this.constructor.name;

    if (props)
      this.properties = props;
  }
}


module.exports = {
  ApiError
}

function getStatusByCode(code){
  switch (code) {
    case 200:
      return core.api.status.ok
    case 201:
      return core.api.status.created
    case 202:
      return core.api.status.accepted
    case 203:
      return core.api.status.partial
    case 204:
      return core.api.status.nores
    case 400:
      return core.api.status.badreq
    case 401:
      return core.api.status.unauthorized
    case 402:
      return core.api.status.paymentrequired
    case 403:
      return core.api.status.forbidden
    case 404:
      return core.api.status.notfound
    case 500:
      return core.api.status.internalerr
    case 501:
      return core.api.status.notimpl
    case 502:
      return core.api.status.overloaded
    case 503:
      return core.api.status.timeout
    case 550:
      return core.api.status.denied
    default:
      // if no match
      // return [500] Internal Error
      return core.api.status.internalerr
  }
}

function getCodeByStatus(status){
  switch (status) {
    case core.api.status.ok:
      return 200
    case core.api.status.created:
      return 201
    case core.api.status.accepted:
      return 202
    case core.api.status.partial:
      return 203
    case core.api.status.nores:
      return 204
    case core.api.status.badreq:
      return 400
    case core.api.status.unauthorized:
      return 401
    case core.api.status.paymentrequired:
      return 402
    case core.api.status.forbidden:
      return 403
    case core.api.status.notfound:
      return 404
    case core.api.status.internalerr:
      return 500
    case core.api.status.notimpl:
      return 501
    case core.api.status.overloaded:
      return 502
    case core.api.status.timeout:
      return 503
    case core.api.status.denied:
      return 550
    default:
      // if no match
      // return [500] Internal Error
      return 500
  }
}