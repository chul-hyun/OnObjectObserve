/**
 * OnObjectObserve
 * @class OnObjectObserve
 * @param  {Object} o Observed object
 * @return {OnObjectObserve}
 */
function OnObjectObserve(o){
	/**
	 * EventEmitter object
	 * @private
	 * @type {EventEmitter}
	 */
	this._ee = new EventEmitter();

	Object.observe(o, this._observer);
}

OnObjectObserve.deliverChangeRecords = deliverChangeRecords;
OnObjectObserve.prototype = {
	deliverChangeRecords 	: deliverChangeRecords,
	_observer 				: _observer,
	on 						: on
}

/**
 * excute Object.deliverChangeRecords(...)
 * @method OnObjectObserve.deliverChangeRecords
 */
/**
 * excute Object.deliverChangeRecords(...)
 * @method OnObjectObserve.prototype.deliverChangeRecords
 */
function deliverChangeRecords(){
	Object.deliverChangeRecords(OnObjectObserve.prototype._observer);
}

/**
 * on
 * @method OnObjectObserve.prototype.on
 */
function on(){
	this._ee.on.apply(this, arguments);
}

/**
 * observer ( Object.observe(o, this._observer) )
 * excute emit('change', changes)
 * @private
 * @method OnObjectObserve.prototype._observer
 */
function _observer(changes){
	this._ee.emit('change', changes);
}