/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as import0 from '../../../src/app/patient.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '../../../src/app/patient-provider.service';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '../../../src/app/server.service';
import * as import10 from '@angular/router/src/router_state';
import * as import11 from '@angular/material/toolbar/toolbar';
import * as import12 from '../../node_modules/@angular/material/core/compatibility/compatibility.ngfactory';
import * as import13 from '../../node_modules/@angular/material/toolbar/toolbar.ngfactory';
import * as import14 from '@angular/core/src/linker/view_container';
import * as import15 from '../../node_modules/@angular/router/src/directives/router_outlet.ngfactory';
import * as import16 from '@angular/core/src/change_detection/change_detection_util';
import * as import17 from '@angular/material/core/compatibility/compatibility';
import * as import18 from '@angular/core/src/linker/element_ref';
import * as import19 from '@angular/router/src/router_outlet_map';
import * as import20 from '@angular/core/src/linker/component_factory_resolver';
import * as import21 from '@angular/router/src/directives/router_outlet';
var Wrapper_PatientComponent = (function () {
    function Wrapper_PatientComponent(p0, p1) {
        this._changed = false;
        this.context = new import0.PatientComponent(p0, p1);
    }
    Wrapper_PatientComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_PatientComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_PatientComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        if (!throwOnChange) {
            if ((view.numberOfChecks === 0)) {
                this.context.ngOnInit();
            }
        }
        return changed;
    };
    Wrapper_PatientComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_PatientComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_PatientComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_PatientComponent;
}());
export { Wrapper_PatientComponent };
var renderType_PatientComponent_Host = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, [], {});
var View_PatientComponent_Host0 = (function (_super) {
    __extends(View_PatientComponent_Host0, _super);
    function View_PatientComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        return _super.call(this, View_PatientComponent_Host0, renderType_PatientComponent_Host, import6.ViewType.HOST, viewUtils, parentView, parentIndex, parentElement, import7.ChangeDetectorStatus.CheckAlways) || this;
    }
    View_PatientComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer, 'ng-component', import3.EMPTY_INLINE_ARRAY, rootSelector, null);
        this.compView_0 = new View_PatientComponent0(this.viewUtils, this, 0, this._el_0);
        this._PatientProvider_0_3 = new import5.PatientProvider(this.injectorGet(import9.Server, this.parentIndex));
        this._PatientComponent_0_4 = new Wrapper_PatientComponent(this._PatientProvider_0_3, this.injectorGet(import10.ActivatedRoute, this.parentIndex));
        this.compView_0.create(this._PatientComponent_0_4.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new import8.ComponentRef_(0, this, this._el_0, this._PatientComponent_0_4.context);
    };
    View_PatientComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import5.PatientProvider) && (0 === requestNodeIndex))) {
            return this._PatientProvider_0_3;
        }
        if (((token === import0.PatientComponent) && (0 === requestNodeIndex))) {
            return this._PatientComponent_0_4.context;
        }
        return notFoundResult;
    };
    View_PatientComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._PatientComponent_0_4.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_PatientComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_PatientComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_PatientComponent_Host0;
}(import1.AppView));
export var PatientComponentNgFactory = new import8.ComponentFactory('ng-component', View_PatientComponent_Host0, import0.PatientComponent);
var styles_PatientComponent = [];
var renderType_PatientComponent = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, styles_PatientComponent, {});
var View_PatientComponent0 = (function (_super) {
    __extends(View_PatientComponent0, _super);
    function View_PatientComponent0(viewUtils, parentView, parentIndex, parentElement) {
        var _this = _super.call(this, View_PatientComponent0, renderType_PatientComponent, import6.ViewType.COMPONENT, viewUtils, parentView, parentIndex, parentElement, import7.ChangeDetectorStatus.CheckAlways) || this;
        _this._expr_14 = import16.UNINITIALIZED;
        return _this;
    }
    View_PatientComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._text_0 = this.renderer.createText(parentRenderNode, '\n		', null);
        this._el_1 = import3.createRenderElement(this.renderer, parentRenderNode, 'md-toolbar', new import3.InlineArray8(6, 'color', 'primary', 'role', 'toolbar', 'style', 'margin:0 0 10px 0;'), null);
        this.compView_1 = new import13.View_MdToolbar0(this.viewUtils, this, 1, this._el_1);
        this._MdPrefixRejector_1_3 = new import12.Wrapper_MdPrefixRejector(this.parentView.injectorGet(import17.MATERIAL_COMPATIBILITY_MODE, this.parentIndex, null));
        this._MdToolbar_1_4 = new import13.Wrapper_MdToolbar(new import18.ElementRef(this._el_1), this.renderer);
        this._text_2 = this.renderer.createText(null, '\n			', null);
        this._el_3 = import3.createRenderElement(this.renderer, null, 'span', import3.EMPTY_INLINE_ARRAY, null);
        this._text_4 = this.renderer.createText(this._el_3, '', null);
        this._text_5 = this.renderer.createText(null, '\n		', null);
        this.compView_1.create(this._MdToolbar_1_4.context);
        this._text_6 = this.renderer.createText(parentRenderNode, '\n		', null);
        this._el_7 = import3.createRenderElement(this.renderer, parentRenderNode, 'router-outlet', import3.EMPTY_INLINE_ARRAY, null);
        this._vc_7 = new import14.ViewContainer(7, null, this, this._el_7);
        this._RouterOutlet_7_5 = new import15.Wrapper_RouterOutlet(this.parentView.injectorGet(import19.RouterOutletMap, this.parentIndex), this._vc_7.vcRef, this.parentView.injectorGet(import20.ComponentFactoryResolver, this.parentIndex), null);
        this._text_8 = this.renderer.createText(parentRenderNode, '\n	', null);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._text_0,
            this._el_1,
            this._text_2,
            this._el_3,
            this._text_4,
            this._text_5,
            this._text_6,
            this._el_7,
            this._text_8
        ]), null);
        return null;
    };
    View_PatientComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import17.MdPrefixRejector) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 5)))) {
            return this._MdPrefixRejector_1_3.context;
        }
        if (((token === import11.MdToolbar) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 5)))) {
            return this._MdToolbar_1_4.context;
        }
        if (((token === import21.RouterOutlet) && (7 === requestNodeIndex))) {
            return this._RouterOutlet_7_5.context;
        }
        return notFoundResult;
    };
    View_PatientComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        this._MdPrefixRejector_1_3.ngDoCheck(this, this._el_1, throwOnChange);
        var currVal_1_1_0 = 'primary';
        this._MdToolbar_1_4.check_color(currVal_1_1_0, throwOnChange, false);
        if (this._MdToolbar_1_4.ngDoCheck(this, this._el_1, throwOnChange)) {
            this.compView_1.markAsCheckOnce();
        }
        this._RouterOutlet_7_5.ngDoCheck(this, this._el_7, throwOnChange);
        this._vc_7.detectChangesInNestedViews(throwOnChange);
        this._MdToolbar_1_4.checkHost(this, this.compView_1, this._el_1, throwOnChange);
        var currVal_14 = import3.inlineInterpolate(1, '', (this.context.pp.patient.id ? this.context.pp.patient.name : 'New Patient'), '');
        if (import3.checkBinding(throwOnChange, this._expr_14, currVal_14)) {
            this.renderer.setText(this._text_4, currVal_14);
            this._expr_14 = currVal_14;
        }
        this.compView_1.internalDetectChanges(throwOnChange);
    };
    View_PatientComponent0.prototype.destroyInternal = function () {
        this._vc_7.destroyNestedViews();
        this.compView_1.destroy();
        this._RouterOutlet_7_5.ngOnDestroy();
    };
    View_PatientComponent0.prototype.visitProjectableNodesInternal = function (nodeIndex, ngContentIndex, cb, ctx) {
        if (((nodeIndex == 1) && (ngContentIndex == 0))) {
            cb(this._text_2, ctx);
            cb(this._el_3, ctx);
            cb(this._text_5, ctx);
        }
        if (((nodeIndex == 1) && (ngContentIndex == 1))) { }
    };
    return View_PatientComponent0;
}(import1.AppView));
export { View_PatientComponent0 };
//# sourceMappingURL=patient.component.ngfactory.js.map