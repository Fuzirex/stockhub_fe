import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContextService} from "../../services/context/context.service";
import {NgxSpinnerService} from "ngx-spinner";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.085, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.45, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  {position: 21, name: 'Scandium', weight: 44.9559, symbol: 'Sc'},
  {position: 22, name: 'Titanium', weight: 47.867, symbol: 'Ti'},
  {position: 23, name: 'Vanadium', weight: 50.9415, symbol: 'V'},
  {position: 24, name: 'Chromium', weight: 52.0, symbol: 'Cr'},
  {position: 25, name: 'Manganese', weight: 54.938044, symbol: 'Mn'},
  {position: 26, name: 'Iron', weight: 55.845, symbol: 'Fe'},
  {position: 27, name: 'Cobalt', weight: 58.933, symbol: 'Co'},
  {position: 28, name: 'Nickel', weight: 58.6934, symbol: 'Ni'},
  {position: 29, name: 'Copper', weight: 63.546, symbol: 'Cu'},
  {position: 30, name: 'Zinc', weight: 65.38, symbol: 'Zn'},
  {position: 31, name: 'Gallium', weight: 69.723, symbol: 'Ga'},
  {position: 32, name: 'Germanium', weight: 72.63, symbol: 'Ge'},
  {position: 33, name: 'Arsenic', weight: 74.9216, symbol: 'As'},
  {position: 34, name: 'Selenium', weight: 78.971, symbol: 'Se'},
  {position: 35, name: 'Bromine', weight: 79.904, symbol: 'Br'},
  {position: 36, name: 'Krypton', weight: 83.798, symbol: 'Kr'},
  {position: 37, name: 'Rubidium', weight: 85.4678, symbol: 'Rb'},
  {position: 38, name: 'Strontium', weight: 87.62, symbol: 'Sr'},
  {position: 39, name: 'Yttrium', weight: 88.90584, symbol: 'Y'},
  {position: 40, name: 'Zirconium', weight: 91.224, symbol: 'Zr'},
  {position: 41, name: 'Niobium', weight: 92.906, symbol: 'Nb'},
  {position: 42, name: 'Molybdenum', weight: 95.95, symbol: 'Mo'},
  {position: 43, name: 'Technetium', weight: 98, symbol: 'Tc'},
  {position: 44, name: 'Ruthenium', weight: 101.07, symbol: 'Ru'},
  {position: 45, name: 'Rhodium', weight: 102.9055, symbol: 'Rh'},
  {position: 46, name: 'Palladium', weight: 106.42, symbol: 'Pd'},
  {position: 47, name: 'Silver', weight: 107.8682, symbol: 'Ag'},
  {position: 48, name: 'Cadmium', weight: 112.411, symbol: 'Cd'},
  {position: 49, name: 'Indium', weight: 114.818, symbol: 'In'},
  {position: 50, name: 'Tin', weight: 118.71, symbol: 'Sn'},
  {position: 51, name: 'Antimony', weight: 121.76, symbol: 'Sb'},
  {position: 52, name: 'Tellurium', weight: 127.6, symbol: 'Te'},
  {position: 53, name: 'Iodine', weight: 126.90447, symbol: 'I'},
  {position: 54, name: 'Xenon', weight: 131.293, symbol: 'Xe'},
  {position: 55, name: 'Cesium', weight: 132.90545196, symbol: 'Cs'},
  {position: 56, name: 'Barium', weight: 137.327, symbol: 'Ba'},
  {position: 57, name: 'Lanthanum', weight: 138.90547, symbol: 'La'},
  {position: 58, name: 'Cerium', weight: 140.116, symbol: 'Ce'},
  {position: 59, name: 'Praseodymium', weight: 140.90766, symbol: 'Pr'},
  {position: 60, name: 'Neodymium', weight: 144.242, symbol: 'Nd'},
  {position: 61, name: 'Promethium', weight: 145, symbol: 'Pm'},
  {position: 62, name: 'Samarium', weight: 150.36, symbol: 'Sm'},
  {position: 63, name: 'Europium', weight: 151.964, symbol: 'Eu'},
  {position: 64, name: 'Gadolinium', weight: 157.25, symbol: 'Gd'},
  {position: 65, name: 'Terbium', weight: 158.92535, symbol: 'Tb'},
  {position: 66, name: 'Dysprosium', weight: 162.500, symbol: 'Dy'},
  {position: 67, name: 'Holmium', weight: 164.93033, symbol: 'Ho'},
  {position: 68, name: 'Erbium', weight: 167.259, symbol: 'Er'},
  {position: 69, name: 'Thulium', weight: 168.93422, symbol: 'Tm'},
  {position: 70, name: 'Ytterbium', weight: 173.04, symbol: 'Yb'},
  {position: 71, name: 'Lutetium', weight: 175.0, symbol: 'Lu'},
  {position: 72, name: 'Hafnium', weight: 178.49, symbol: 'Hf'},
  {position: 73, name: 'Tantalum', weight: 180.94788, symbol: 'Ta'},
  {position: 74, name: 'Tungsten', weight: 183.84, symbol: 'W'},
  {position: 75, name: 'Rhenium', weight: 186.207, symbol: 'Re'}
];

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(private router: Router) {
  }

  onSubmit() {
    this.router.navigateByUrl('login');
  }

}
