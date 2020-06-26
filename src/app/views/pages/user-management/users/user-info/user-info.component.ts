import { AfterViewInit, AfterViewChecked } from '@angular/core';
// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// RXJS
import { debounceTime, distinctUntilChanged, tap, skip, take, delay } from 'rxjs/operators';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
// LODASH
import { each, find } from 'lodash';
// NGRX
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';

// Services
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../core/_base/crud';
// Models
import {
	User,
	Role,
	UsersDataSource,
	UserDeleted,
	UsersPageRequested,
	selectUserById,
	selectAllRoles
} from '../../../../../core/auth';
import { SubheaderService } from '../../../../../core/_base/layout';

@Component({
	selector: 'kt-user-info',
	templateUrl: './user-info.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnInit, OnDestroy {
	// Table fields
	dataSource: UsersDataSource;
	displayedColumns = ['select', 'id', 'username', 'email', 'fullname', '_roles', 'actions'];
  user: any[];

	constructor() {}

	ngOnInit() {

	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
	}
}
