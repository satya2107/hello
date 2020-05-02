import { Pipe } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UserNameValidators{
     
    //adding cannotContainSpace custom validator, here it is a static function
   static cannotContainSpace (control: AbstractControl): ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0) //ValidationErrors in a complex object
            return { cannotContainSpace : true};

        return null;

        //complex object validator return statement
        // return{
        //     minLenghth : {
        //         requiredLength: 3,
        //         ActualLength: control.value.length
        //     }}
        }
    //Asynchronous validator below; return type will be different. Check interface of AsyncValidatorFn in angular.io
    static shouldBeUnique(control: AbstractControl) : Promise <ValidationErrors | null> {
        return new Promise((resolve, reject)=> {
            setTimeout(()=> {
                if(control.value === "mosh")
                    resolve({ shouldBeUnique : true});
                else
                    resolve(null);
            }, 20000);
        });
    }
}