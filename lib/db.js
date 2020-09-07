class Db {
  constructor() {
    this._public = null
    this._private = null
  }

  public = () => {
    return this._public
  }

  private = () => {
    return this._private
  }
}

export default Db
