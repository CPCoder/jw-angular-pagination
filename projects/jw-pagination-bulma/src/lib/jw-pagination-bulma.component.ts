import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import paginate from 'jw-paginate';

@Component({
    selector: 'jw-pagination',
    template: `<nav class="pagination is-centered is-small" role="navigation" aria-label="pagination">
    <ul *ngIf="pager.pages && pager.pages.length" class="pagination-list">
        <li>
            <a (click)="setPage(1)" [ngClass]="{disabled:pager.currentPage === 1}" class="pagination-previous"
               [attr.aria-label]="'Go to first page'">First</a>
        </li>
        <li>
            <a (click)="setPage(pager.currentPage - 1)" [ngClass]="{disabled:pager.currentPage === 1}"
               class="pagination-previous" [attr.aria-label]="'Go to previos page'">Previous</a>
        </li>
        <li *ngFor="let page of pager.pages">
            <a (click)="setPage(page)" class="pagination-link" [ngClass]="{'is-current':pager.currentPage === 'page'}"
               [attr.aria-label]="'Page' + page" [attr.aria-current]="{page:pager.currentPage === 'page'}">{{page}}</a>
        </li>
        <li>
            <a (click)="setPage(pager.currentPage + 1)" class="pagination-link"
               [attr.aria-label]="'Go to next page'" [ngClass]="{disabled:pager.currentPage === pager.totalPages}">Next</a>
        </li>
        <li>
            <a (click)="setPage(pager.totalPages)" class="pagination-link" [attr.aria-label]="'Go to last page'"
               [ngClass]="{disabled:pager.currentPage === pager.totalPages}">Last</a>
        </li>
    </ul>
</nav>`
})

export class JwPaginationBulmaComponent implements OnInit, OnChanges {
    @Input() items: Array<any>;
    @Output() changePage = new EventEmitter<any>(true);
    @Input() initialPage = 1;
    @Input() pageSize = 10;
    @Input() maxPages = 10;

    pager: any = {};

    ngOnInit() {
        // set page if items array isn't empty
        if (this.items && this.items.length) {
            this.setPage(this.initialPage);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // reset page if items array has changed
        if (changes.items.currentValue !== changes.items.previousValue) {
            this.setPage(this.initialPage);
        }
    }

    setPage(page: number) {
        // get new pager object for specified page
        this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

        // get new page of items from items array
        var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

        // call change page function in parent component
        this.changePage.emit(pageOfItems);
    }
}
