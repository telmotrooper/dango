export default _default;
export namespace _default {
  function Neo4jError(message: any, ...args: any[]): any;
  namespace Neo4jError {
    function captureStackTrace(p0: any, p1: any): any;
    const stackTraceLimit: number;
  }
  namespace auth {
    function basic(username: any, password: any, ...args: any[]): any;
    function custom(principal: any, credentials: any, realm: any, scheme: any, ...args: any[]): any;
    function kerberos(base64EncodedTicket: any): any;
  }
  function driver(url: any, authToken: any, ...args: any[]): any;
  const error: {
    PROTOCOL_ERROR: string;
    SERVICE_UNAVAILABLE: string;
    SESSION_EXPIRED: string;
  };
  function int(val: any): any;
  namespace integer {
    function inSafeRange(val: any): any;
    function toNumber(val: any): any;
    function toString(val: any, radix: any): any;
  }
  function isDate(obj: any): any;
  function isDateTime(obj: any): any;
  function isDuration(obj: any): any;
  function isInt(obj: any): any;
  function isLocalDateTime(obj: any): any;
  function isLocalTime(obj: any): any;
  function isPoint(obj: any): any;
  function isTime(obj: any): any;
  namespace logging {
    function console(_x3: any, ...args: any[]): any;
  }
  const session: {
    READ: string;
    WRITE: string;
  };
  namespace spatial {
    function isPoint(obj: any): any;
  }
  namespace temporal {
    function isDate(obj: any): any;
    function isDateTime(obj: any): any;
    function isDuration(obj: any): any;
    function isLocalDateTime(obj: any): any;
    function isLocalTime(obj: any): any;
    function isTime(obj: any): any;
  }
  namespace types {
    class Date {
      static fromStandardDate(standardDate: any): any;
      constructor(year: any, month: any, day: any);
      year: any;
      month: any;
      day: any;
    }
    class DateTime {
      static fromStandardDate(standardDate: any, nanosecond: any): any;
      constructor(year: any, month: any, day: any, hour: any, minute: any, second: any, nanosecond: any, timeZoneOffsetSeconds: any, timeZoneId: any);
      year: any;
      month: any;
      day: any;
      hour: any;
      minute: any;
      second: any;
      nanosecond: any;
      timeZoneOffsetSeconds: any;
      timeZoneId: any;
    }
    class Duration {
      constructor(months: any, days: any, seconds: any, nanoseconds: any);
      months: any;
      days: any;
      seconds: any;
      nanoseconds: any;
    }
    class Integer {
      static MAX_SAFE_VALUE: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static MAX_VALUE: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static MIN_SAFE_VALUE: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static MIN_VALUE: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static NEG_ONE: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static ONE: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static ZERO: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static fromBits(lowBits: any, highBits: any): any;
      static fromInt(value: any): any;
      static fromNumber(value: any): any;
      static fromString(str: any, radix: any): any;
      static fromValue(val: any): any;
      static inSafeRange(val: any): any;
      static isInteger(obj: any): any;
      static toNumber(val: any): any;
      static toString(val: any, radix: any): any;
      constructor(low: any, high: any);
      low: any;
      high: any;
      add(addend: any): any;
      and(other: any): any;
      compare(other: any): any;
      div(divisor: any): any;
      equals(other: any): any;
      getHighBits(): any;
      getLowBits(): any;
      getNumBitsAbs(): any;
      greaterThan(other: any): any;
      greaterThanOrEqual(other: any): any;
      inSafeRange(): any;
      isEven(): any;
      isNegative(): any;
      isOdd(): any;
      isPositive(): any;
      isZero(): any;
      lessThan(other: any): any;
      lessThanOrEqual(other: any): any;
      modulo(divisor: any): any;
      multiply(multiplier: any): any;
      negate(): any;
      not(): any;
      notEquals(other: any): any;
      or(other: any): any;
      shiftLeft(numBits: any): any;
      shiftRight(numBits: any): any;
      subtract(subtrahend: any): any;
      toInt(): any;
      toNumber(): any;
      toNumberOrInfinity(): any;
      toString(radix: any): any;
      xor(other: any): any;
    }
    class LocalDateTime {
      static fromStandardDate(standardDate: any, nanosecond: any): any;
      constructor(year: any, month: any, day: any, hour: any, minute: any, second: any, nanosecond: any);
      year: any;
      month: any;
      day: any;
      hour: any;
      minute: any;
      second: any;
      nanosecond: any;
    }
    class LocalTime {
      static fromStandardDate(standardDate: any, nanosecond: any): any;
      constructor(hour: any, minute: any, second: any, nanosecond: any);
      hour: any;
      minute: any;
      second: any;
      nanosecond: any;
    }
    class Node {
      constructor(identity: any, labels: any, properties: any);
      identity: any;
      labels: any;
      properties: any;
    }
    class Path {
      constructor(start: any, end: any, segments: any);
      start: any;
      end: any;
      segments: any;
      length: any;
    }
    class PathSegment {
      constructor(start: any, rel: any, end: any);
      start: any;
      relationship: any;
      end: any;
    }
    class Point {
      constructor(srid: any, x: any, y: any, z: any);
      srid: any;
      x: any;
      y: any;
      z: any;
    }
    class Record {
      constructor(keys: any, fields: any, ...args: any[]);
      keys: any;
      length: any;
      forEach(visitor: any): void;
      get(key: any): any;
      has(key: any): any;
      toObject(): any;
    }
    class Relationship {
      constructor(identity: any, start: any, end: any, type: any, properties: any);
      identity: any;
      start: any;
      end: any;
      type: any;
      properties: any;
    }
    class Result {
      constructor(streamObserver: any, statement: any, parameters: any, metaSupplier: any, connectionHolder: any);
      subscribe(observer: any): void;
      then(onFulfilled: any, onRejected: any): any;
    }
    class ResultSummary {
      constructor(statement: any, parameters: any, metadata: any);
      statement: any;
      statementType: any;
      counters: any;
      updateStatistics: any;
      plan: any;
      profile: any;
      notifications: any;
      server: any;
      resultConsumedAfter: any;
      resultAvailableAfter: any;
      hasPlan(): any;
      hasProfile(): any;
    }
    class Time {
      static fromStandardDate(standardDate: any, nanosecond: any): any;
      constructor(hour: any, minute: any, second: any, nanosecond: any, timeZoneOffsetSeconds: any);
      hour: any;
      minute: any;
      second: any;
      nanosecond: any;
      timeZoneOffsetSeconds: any;
    }
    class UnboundRelationship {
      constructor(identity: any, type: any, properties: any);
      identity: any;
      type: any;
      properties: any;
      bind(start: any, end: any): any;
    }
  }
}
export namespace v1 {
  function Neo4jError(message: any, ...args: any[]): any;
  namespace Neo4jError {
    function captureStackTrace(p0: any, p1: any): any;
    const stackTraceLimit: number;
  }
  namespace auth {
    function basic(username: any, password: any, ...args: any[]): any;
    function custom(principal: any, credentials: any, realm: any, scheme: any, ...args: any[]): any;
    function kerberos(base64EncodedTicket: any): any;
  }
  function driver(url: any, authToken: any, ...args: any[]): any;
  const error: {
    PROTOCOL_ERROR: string;
    SERVICE_UNAVAILABLE: string;
    SESSION_EXPIRED: string;
  };
  function int(val: any): any;
  namespace integer {
    function inSafeRange(val: any): any;
    function toNumber(val: any): any;
    function toString(val: any, radix: any): any;
  }
  function isDate(obj: any): any;
  function isDateTime(obj: any): any;
  function isDuration(obj: any): any;
  function isInt(obj: any): any;
  function isLocalDateTime(obj: any): any;
  function isLocalTime(obj: any): any;
  function isPoint(obj: any): any;
  function isTime(obj: any): any;
  namespace logging {
    function console(_x3: any, ...args: any[]): any;
  }
  const session: {
    READ: string;
    WRITE: string;
  };
  namespace spatial {
    function isPoint(obj: any): any;
  }
  namespace temporal {
    function isDate(obj: any): any;
    function isDateTime(obj: any): any;
    function isDuration(obj: any): any;
    function isLocalDateTime(obj: any): any;
    function isLocalTime(obj: any): any;
    function isTime(obj: any): any;
  }
  namespace types {
    class Date {
      static fromStandardDate(standardDate: any): any;
      constructor(year: any, month: any, day: any);
      year: any;
      month: any;
      day: any;
    }
    class DateTime {
      static fromStandardDate(standardDate: any, nanosecond: any): any;
      constructor(year: any, month: any, day: any, hour: any, minute: any, second: any, nanosecond: any, timeZoneOffsetSeconds: any, timeZoneId: any);
      year: any;
      month: any;
      day: any;
      hour: any;
      minute: any;
      second: any;
      nanosecond: any;
      timeZoneOffsetSeconds: any;
      timeZoneId: any;
    }
    class Duration {
      constructor(months: any, days: any, seconds: any, nanoseconds: any);
      months: any;
      days: any;
      seconds: any;
      nanoseconds: any;
    }
    class Integer {
      static MAX_SAFE_VALUE: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static MAX_VALUE: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static MIN_SAFE_VALUE: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static MIN_VALUE: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static NEG_ONE: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static ONE: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static ZERO: {
        add: any;
        and: any;
        compare: any;
        div: any;
        equals: any;
        getHighBits: any;
        getLowBits: any;
        getNumBitsAbs: any;
        greaterThan: any;
        greaterThanOrEqual: any;
        high: any;
        inSafeRange: any;
        isEven: any;
        isNegative: any;
        isOdd: any;
        isPositive: any;
        isZero: any;
        lessThan: any;
        lessThanOrEqual: any;
        low: any;
        modulo: any;
        multiply: any;
        negate: any;
        not: any;
        notEquals: any;
        or: any;
        shiftLeft: any;
        shiftRight: any;
        subtract: any;
        toInt: any;
        toNumber: any;
        toNumberOrInfinity: any;
        toString: any;
        xor: any;
      };
      static fromBits(lowBits: any, highBits: any): any;
      static fromInt(value: any): any;
      static fromNumber(value: any): any;
      static fromString(str: any, radix: any): any;
      static fromValue(val: any): any;
      static inSafeRange(val: any): any;
      static isInteger(obj: any): any;
      static toNumber(val: any): any;
      static toString(val: any, radix: any): any;
      constructor(low: any, high: any);
      low: any;
      high: any;
      add(addend: any): any;
      and(other: any): any;
      compare(other: any): any;
      div(divisor: any): any;
      equals(other: any): any;
      getHighBits(): any;
      getLowBits(): any;
      getNumBitsAbs(): any;
      greaterThan(other: any): any;
      greaterThanOrEqual(other: any): any;
      inSafeRange(): any;
      isEven(): any;
      isNegative(): any;
      isOdd(): any;
      isPositive(): any;
      isZero(): any;
      lessThan(other: any): any;
      lessThanOrEqual(other: any): any;
      modulo(divisor: any): any;
      multiply(multiplier: any): any;
      negate(): any;
      not(): any;
      notEquals(other: any): any;
      or(other: any): any;
      shiftLeft(numBits: any): any;
      shiftRight(numBits: any): any;
      subtract(subtrahend: any): any;
      toInt(): any;
      toNumber(): any;
      toNumberOrInfinity(): any;
      toString(radix: any): any;
      xor(other: any): any;
    }
    class LocalDateTime {
      static fromStandardDate(standardDate: any, nanosecond: any): any;
      constructor(year: any, month: any, day: any, hour: any, minute: any, second: any, nanosecond: any);
      year: any;
      month: any;
      day: any;
      hour: any;
      minute: any;
      second: any;
      nanosecond: any;
    }
    class LocalTime {
      static fromStandardDate(standardDate: any, nanosecond: any): any;
      constructor(hour: any, minute: any, second: any, nanosecond: any);
      hour: any;
      minute: any;
      second: any;
      nanosecond: any;
    }
    class Node {
      constructor(identity: any, labels: any, properties: any);
      identity: any;
      labels: any;
      properties: any;
    }
    class Path {
      constructor(start: any, end: any, segments: any);
      start: any;
      end: any;
      segments: any;
      length: any;
    }
    class PathSegment {
      constructor(start: any, rel: any, end: any);
      start: any;
      relationship: any;
      end: any;
    }
    class Point {
      constructor(srid: any, x: any, y: any, z: any);
      srid: any;
      x: any;
      y: any;
      z: any;
    }
    class Record {
      constructor(keys: any, fields: any, ...args: any[]);
      keys: any;
      length: any;
      forEach(visitor: any): void;
      get(key: any): any;
      has(key: any): any;
      toObject(): any;
    }
    class Relationship {
      constructor(identity: any, start: any, end: any, type: any, properties: any);
      identity: any;
      start: any;
      end: any;
      type: any;
      properties: any;
    }
    class Result {
      constructor(streamObserver: any, statement: any, parameters: any, metaSupplier: any, connectionHolder: any);
      subscribe(observer: any): void;
      then(onFulfilled: any, onRejected: any): any;
    }
    class ResultSummary {
      constructor(statement: any, parameters: any, metadata: any);
      statement: any;
      statementType: any;
      counters: any;
      updateStatistics: any;
      plan: any;
      profile: any;
      notifications: any;
      server: any;
      resultConsumedAfter: any;
      resultAvailableAfter: any;
      hasPlan(): any;
      hasProfile(): any;
    }
    class Time {
      static fromStandardDate(standardDate: any, nanosecond: any): any;
      constructor(hour: any, minute: any, second: any, nanosecond: any, timeZoneOffsetSeconds: any);
      hour: any;
      minute: any;
      second: any;
      nanosecond: any;
      timeZoneOffsetSeconds: any;
    }
    class UnboundRelationship {
      constructor(identity: any, type: any, properties: any);
      identity: any;
      type: any;
      properties: any;
      bind(start: any, end: any): any;
    }
  }
}
