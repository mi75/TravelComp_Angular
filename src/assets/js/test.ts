export class Vehicle  {

	constructor(wc : number, dc: number){
		this.wheelsCount = wc;
		this.doorsCount = dc;
	}

	public addWheel() : boolean {
		if (this.wheelsCount == 6){
			return false;
		}
		this.wheelsCount++;
		return true;
	}

	public getDoorsCount() : number {
		return this.doorsCount;
	}

	private wheelsCount : number;
	private doorsCount : number;
	public color : string;
}

export class Car extends Vehicle{

	public passengers: {
        [key: string]: number;
	}
	
	constructor(wc : number, dc: number, passengers: {
        [key: string]: number;
    }){
		super(wc, dc);
		this.passengers = passengers;
	}
}

export class CarCreator  {

	public CreateCar() : void {

		var moto = new Vehicle(2, 0);


		var car = new Car(4, 4, {
			"Vasya" : 83,
			"Anton": 77,
			"Katya": 45
		});

		car.addWheel();
		car.getDoorsCount();
	}
}

