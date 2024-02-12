export default class Size {
    private _width = 0
    private _height = 0

    private _marginWidth = 0
    private _marginHeight = 0
    private _pageLength = 0

    constructor(marginWidth = 0, marginHeight = 0, pageLength = 1) {
        this._marginWidth = marginWidth
        this._marginHeight = marginHeight
        this._pageLength = pageLength
        this.reflesh()
    }

    public reflesh() {
        this._width = document.body.clientWidth - this._marginWidth
        this._height = window.innerHeight * this._pageLength - this._marginHeight
    }

    get width() {
        return this._width
    }

    get height() {
        return this._height
    }

    get aspect() {
        return this.width / this.height
    }
}