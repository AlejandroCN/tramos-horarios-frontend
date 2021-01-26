import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public nombrePropio = '[ A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$';
  public alfaNum = '([a-zA-z0-9])*$';
  public alfaNumEspaciosAcentos = '[ A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]*$';
  public email = '/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/';
  public direccion = '[a-zA-Z0-9,.zñÑáéíóúÁÉÍÓÚ#/ ]*$';
  public soloNumeros = '([0-9])*$';
  public numerosDecimales = '^[0-9]*(\.[0-9]+)?$';
  public soloUrl = 	'^(https?:\/\/)?([\da-z\.-]+)\.([a-zA-Z0-9\.]{2,10})\/([a-zA-Z0-9]{10,25})$';

  constructor() { }
}
