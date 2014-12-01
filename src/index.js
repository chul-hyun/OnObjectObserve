/**
 * OnObjectObserve
 * @class OnObjectObserve
 * @param  {Object} o Observed object
 * @return {OnObjectObserve}
 */
function OnObjectObserve(o){
	var self = this;
	var _observer = function(changes){
		self._ee.emit.call(self._ee, 'change', changes);
	}
	Object.observe(o, _observer);

	/**
	 * EventEmitter object
	 * @private
	 * @type {EventEmitter}
	 */
	this._ee = new EventEmitter();

	/**
	 * observer
	 * @private
	 * @type {function}
	 */
	this._observer = _observer;
}

OnObjectObserve.prototype = {
	deliverChangeRecords 	: deliverChangeRecords,
	on 						: on,
	off 						: off
}

/**
 * excute Object.deliverChangeRecords(...)
 * @method OnObjectObserve.prototype.deliverChangeRecords
* @example
* var o = { a: 'a' }
* var ooo = new OnObjectObserve(o);
* ooo.on(function(){
* 	console.log('change!!');
* });
* ooo.on(function(changes){
* 	console.log(JSON.stringify(changes));
* });
* o.a = 'b';
* ooo.deliverChangeRecords();
* console.log('set b')
* // return
* // [{"type":"update","object":{"a":"b"},"name":"a","oldValue":"a"}]
* // change!!
* // set b
 */
function deliverChangeRecords(){
	Object.deliverChangeRecords(this._observer);
}

/**
 * on
 * @method OnObjectObserve.prototype.on
* @example
* var o = { a: 'a' }
* var ooo = new OnObjectObserve(o);
* ooo.on(function(){
* 	console.log('change!!');
* });
* ooo.on(function(changes){
* 	console.log(JSON.stringify(changes));
* });
* o.a = 'b';
* console.log('set b')
* // return
* // set b
* // [{"type":"update","object":{"a":"b"},"name":"a","oldValue":"a"}]
* // change!!
 */
function on(callback){
	this._ee.on.call(this._ee, 'change', callback);
}

/**
 * off
 * @method OnObjectObserve.prototype.off
* @example
* var o = { a: 'a' }
* var ooo = new OnObjectObserve(o);
* ooo.on(function(){
* 	console.log('change!!');
* });
* ooo.on(function(changes){
* 	console.log(JSON.stringify(changes));
* });
* o.a = 'b';
* ooo.deliverChangeRecords();
* ooo.off();
* o.a = 'c';
* // return
* // [{"type":"update","object":{"a":"b"},"name":"a","oldValue":"a"}]
* // change!!
* @example
* var o = { a: 'a' }
* var ooo = new OnObjectObserve(o);
* ooo.on(function(){
* 	console.log('change!!');
* });
* ooo.on(function(changes){
* 	console.log(JSON.stringify(changes));
* });
* o.a = 'b';
* ooo.deliverChangeRecords();
* o.a = 'c';
* // return
* // [{"type":"update","object":{"a":"b"},"name":"a","oldValue":"a"}]
* // change!!
* // [{"type":"update","object":{"a":"c"},"name":"a","oldValue":"b"}]
* // change!!
 */
function off(){
	this._ee.removeEvent.call(this._ee, 'change');
}

