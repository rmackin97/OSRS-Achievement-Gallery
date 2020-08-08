import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "objectEntries"})
export class ObjectEntries implements PipeTransform {
    transform(value: Object): [string, any][] {
        return Object.entries(value);
    }
}