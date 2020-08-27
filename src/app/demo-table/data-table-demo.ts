import { Component, Input, OnInit } from '@angular/core';
import { DataTableResource } from '../data-table';

@Component({
    selector: 'data-table-demo',
    templateUrl: './data-table-demo.html',
    styleUrls: ['./data-table-demo.css']
})
export class DataTableDemo  implements OnInit{

    @Input() personels;

    itemResource;
    items = [];
    itemCount = 0;

    constructor() { }
    ngOnInit() {
        this.itemResource = new DataTableResource(this.personels);
        this.itemResource.count().then(count => this.itemCount = count);
    }

    reloadItems(params) {
        this.itemResource.query(params).then(items => this.items = items);
    }

    // special properties:

    rowClick(rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.name);
    }

    rowDoubleClick(rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.name);
    }

    rowTooltip(item) { return item.jobTitle; }
}
