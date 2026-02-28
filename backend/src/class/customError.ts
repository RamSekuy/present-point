export class Err404 extends Error {
  constructor(msg = "Not Found") {
    super(msg);
  }
}

export class Err400 extends Error {
  constructor(msg = "Bad Request") {
    super(msg);
  }
}

export class Err401 extends Error {
  constructor(msg = "Unauthorized") {
    super(msg);
  }
}

export class Err403 extends Error {
  constructor(msg = "Forbidden") {
    super(msg);
  }
}
