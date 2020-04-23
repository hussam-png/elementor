export default class InstanceType {
	static [Symbol.hasInstance]( target ) {
		/**
		 * This is function extending being called each time JS uses instanceOf, since babel use it each time it create new class
		 * its give's opportunity to mange capabilities of instanceOf operator.
		 * saving current class each time will give option later to handle instanceOf manually.
		 */
		let result = super[ Symbol.hasInstance ]( target );

		if ( target ) {
			if ( ! target.instanceTypes ) {
				target.instanceTypes = [];
			}

			if ( ! result ) {
				if ( this.getInstanceType() === target.constructor.getInstanceType() ) {
					result = true;
				}
			}

			if ( result ) {
				const name = this.getInstanceType === InstanceType.getInstanceType ? 'BaseInstanceType' : this.getInstanceType();

				if ( -1 === target.instanceTypes.indexOf( name ) ) {
					target.instanceTypes.push( name );
				}
			}
		}

		return result;
	}

	constructor() {
		// Since anonymous classes sometimes do not get validated by babel, do it manually.
		let target = new.target,
			prototypes = [];

		while ( target.__proto__ && target.__proto__.name ) {
			prototypes.push( target.__proto__ );
			target = target.__proto__;
		}

		prototypes.reverse().forEach( ( proto ) => this instanceof proto );
	}

	static getInstanceType() {
		elementorModules.ForceMethodImplementation();
	}
}
