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
import * as import0 from '../../../src/app/dialog.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '@angular/material/button/button';
import * as import9 from '../../node_modules/@angular/material/core/compatibility/compatibility.ngfactory';
import * as import10 from '../../node_modules/@angular/material/button/button.ngfactory';
import * as import11 from '../../node_modules/@angular/material/dialog/dialog-content-directives.ngfactory';
import * as import12 from '@angular/core/src/linker/view_container';
import * as import13 from '@angular/core/src/change_detection/change_detection_util';
import * as import14 from '@angular/material/core/compatibility/compatibility';
import * as import15 from '@angular/core/src/linker/element_ref';
import * as import16 from '@angular/material/dialog/dialog-ref';
import * as import17 from '@angular/material/dialog/dialog-content-directives';
import * as import18 from '../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import19 from '@angular/core/src/linker/template_ref';
import * as import20 from '@angular/common/src/directives/ng_if';
var Wrapper_DialogDisplay = (function () {
    function Wrapper_DialogDisplay() {
        this._changed = false;
        this.context = new import0.DialogDisplay();
    }
    Wrapper_DialogDisplay.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_DialogDisplay.prototype.ngOnDestroy = function () {
    };
    Wrapper_DialogDisplay.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        return changed;
    };
    Wrapper_DialogDisplay.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_DialogDisplay.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_DialogDisplay.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_DialogDisplay;
}());
export { Wrapper_DialogDisplay };
var renderType_DialogDisplay_Host = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, [], {});
var View_DialogDisplay_Host0 = (function (_super) {
    __extends(View_DialogDisplay_Host0, _super);
    function View_DialogDisplay_Host0(viewUtils, parentView, parentIndex, parentElement) {
        return _super.call(this, View_DialogDisplay_Host0, renderType_DialogDisplay_Host, import5.ViewType.HOST, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
    }
    View_DialogDisplay_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer, 'ng-component', import3.EMPTY_INLINE_ARRAY, rootSelector, null);
        this.compView_0 = new View_DialogDisplay0(this.viewUtils, this, 0, this._el_0);
        this._DialogDisplay_0_3 = new Wrapper_DialogDisplay();
        this.compView_0.create(this._DialogDisplay_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new import7.ComponentRef_(0, this, this._el_0, this._DialogDisplay_0_3.context);
    };
    View_DialogDisplay_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import0.DialogDisplay) && (0 === requestNodeIndex))) {
            return this._DialogDisplay_0_3.context;
        }
        return notFoundResult;
    };
    View_DialogDisplay_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._DialogDisplay_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_DialogDisplay_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_DialogDisplay_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_DialogDisplay_Host0;
}(import1.AppView));
export var DialogDisplayNgFactory = new import7.ComponentFactory('ng-component', View_DialogDisplay_Host0, import0.DialogDisplay);
var styles_DialogDisplay = [];
var View_DialogDisplay1 = (function (_super) {
    __extends(View_DialogDisplay1, _super);
    function View_DialogDisplay1(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        var _this = _super.call(this, View_DialogDisplay1, renderType_DialogDisplay, import5.ViewType.EMBEDDED, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways, declaredViewContainer) || this;
        _this._expr_7 = import13.UNINITIALIZED;
        return _this;
    }
    View_DialogDisplay1.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.createRenderElement(this.renderer, null, 'button', new import3.InlineArray8(6, 'md-button', '', 'md-dialog-close', '', 'type', 'button'), null);
        this.compView_0 = new import10.View_MdButton0(this.viewUtils, this, 0, this._el_0);
        this._MdPrefixRejector_0_3 = new import9.Wrapper_MdPrefixRejector(this.parentView.parentView.injectorGet(import14.MATERIAL_COMPATIBILITY_MODE, this.parentView.parentIndex, null));
        this._MdButton_0_4 = new import10.Wrapper_MdButton(new import15.ElementRef(this._el_0), this.renderer);
        this._MdButtonCssMatStyler_0_5 = new import10.Wrapper_MdButtonCssMatStyler();
        this._MdDialogClose_0_6 = new import11.Wrapper_MdDialogClose(this.parentView.parentView.injectorGet(import16.MdDialogRef, this.parentView.parentIndex));
        this._text_1 = this.renderer.createText(null, '', null);
        this.compView_0.create(this._MdButton_0_4.context);
        var disposable_0 = import3.subscribeToRenderElement(this, this._el_0, new import3.InlineArray8(8, 'mousedown', null, 'focus', null, 'blur', null, 'click', null), this.eventHandler(this.handleEvent_0));
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1
        ]), [disposable_0]);
        return null;
    };
    View_DialogDisplay1.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import14.MdPrefixRejector) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) {
            return this._MdPrefixRejector_0_3.context;
        }
        if (((token === import8.MdButton) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) {
            return this._MdButton_0_4.context;
        }
        if (((token === import8.MdButtonCssMatStyler) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) {
            return this._MdButtonCssMatStyler_0_5.context;
        }
        if (((token === import17.MdDialogClose) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) {
            return this._MdDialogClose_0_6.context;
        }
        return notFoundResult;
    };
    View_DialogDisplay1.prototype.detectChangesInternal = function (throwOnChange) {
        this._MdPrefixRejector_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        if (this._MdButton_0_4.ngDoCheck(this, this._el_0, throwOnChange)) {
            this.compView_0.markAsCheckOnce();
        }
        this._MdButtonCssMatStyler_0_5.ngDoCheck(this, this._el_0, throwOnChange);
        this._MdDialogClose_0_6.ngDoCheck(this, this._el_0, throwOnChange);
        this._MdButton_0_4.checkHost(this, this.compView_0, this._el_0, throwOnChange);
        this._MdButtonCssMatStyler_0_5.checkHost(this, this.compView_0, this._el_0, throwOnChange);
        this._MdDialogClose_0_6.checkHost(this, this.compView_0, this._el_0, throwOnChange);
        var currVal_7 = import3.inlineInterpolate(1, '', this.parentView.context.close, '');
        if (import3.checkBinding(throwOnChange, this._expr_7, currVal_7)) {
            this.renderer.setText(this._text_1, currVal_7);
            this._expr_7 = currVal_7;
        }
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_DialogDisplay1.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_DialogDisplay1.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_DialogDisplay1.prototype.visitProjectableNodesInternal = function (nodeIndex, ngContentIndex, cb, ctx) {
        if (((nodeIndex == 0) && (ngContentIndex == 0))) {
            cb(this._text_1, ctx);
        }
    };
    View_DialogDisplay1.prototype.handleEvent_0 = function (eventName, $event) {
        this.compView_0.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._MdButton_0_4.handleEvent(eventName, $event) && result);
        result = (this._MdDialogClose_0_6.handleEvent(eventName, $event) && result);
        return result;
    };
    return View_DialogDisplay1;
}(import1.AppView));
var renderType_DialogDisplay = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, styles_DialogDisplay, {});
var View_DialogDisplay0 = (function (_super) {
    __extends(View_DialogDisplay0, _super);
    function View_DialogDisplay0(viewUtils, parentView, parentIndex, parentElement) {
        var _this = _super.call(this, View_DialogDisplay0, renderType_DialogDisplay, import5.ViewType.COMPONENT, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
        _this._expr_21 = import13.UNINITIALIZED;
        _this._expr_22 = import13.UNINITIALIZED;
        return _this;
    }
    View_DialogDisplay0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._text_0 = this.renderer.createText(parentRenderNode, '\n		', null);
        this._el_1 = import3.createRenderElement(this.renderer, parentRenderNode, 'h2', new import3.InlineArray2(2, 'md-dialog-title', ''), null);
        this._MdPrefixRejector_1_3 = new import9.Wrapper_MdPrefixRejector(this.parentView.injectorGet(import14.MATERIAL_COMPATIBILITY_MODE, this.parentIndex, null));
        this._MdDialogTitle_1_4 = new import11.Wrapper_MdDialogTitle();
        this._text_2 = this.renderer.createText(this._el_1, '', null);
        this._text_3 = this.renderer.createText(parentRenderNode, '\n		', null);
        this._el_4 = import3.createRenderElement(this.renderer, parentRenderNode, 'md-dialog-content', import3.EMPTY_INLINE_ARRAY, null);
        this._MdPrefixRejector_4_3 = new import9.Wrapper_MdPrefixRejector(this.parentView.injectorGet(import14.MATERIAL_COMPATIBILITY_MODE, this.parentIndex, null));
        this._MdDialogContent_4_4 = new import11.Wrapper_MdDialogContent();
        this._text_5 = this.renderer.createText(this._el_4, '', null);
        this._text_6 = this.renderer.createText(parentRenderNode, '\n		', null);
        this._el_7 = import3.createRenderElement(this.renderer, parentRenderNode, 'md-dialog-actions', new import3.InlineArray2(2, 'style', 'text-align:center;'), null);
        this._MdPrefixRejector_7_3 = new import9.Wrapper_MdPrefixRejector(this.parentView.injectorGet(import14.MATERIAL_COMPATIBILITY_MODE, this.parentIndex, null));
        this._MdDialogActions_7_4 = new import11.Wrapper_MdDialogActions();
        this._text_8 = this.renderer.createText(this._el_7, '\n			', null);
        this._anchor_9 = this.renderer.createTemplateAnchor(this._el_7, null);
        this._vc_9 = new import12.ViewContainer(9, 7, this, this._anchor_9);
        this._TemplateRef_9_5 = new import19.TemplateRef_(this, 9, this._anchor_9);
        this._NgIf_9_6 = new import18.Wrapper_NgIf(this._vc_9.vcRef, this._TemplateRef_9_5);
        this._text_10 = this.renderer.createText(this._el_7, '\n		', null);
        this._text_11 = this.renderer.createText(parentRenderNode, '	\n		', null);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._text_0,
            this._el_1,
            this._text_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._text_6,
            this._el_7,
            this._text_8,
            this._anchor_9,
            this._text_10,
            this._text_11
        ]), null);
        return null;
    };
    View_DialogDisplay0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import14.MdPrefixRejector) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 2)))) {
            return this._MdPrefixRejector_1_3.context;
        }
        if (((token === import17.MdDialogTitle) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 2)))) {
            return this._MdDialogTitle_1_4.context;
        }
        if (((token === import14.MdPrefixRejector) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 5)))) {
            return this._MdPrefixRejector_4_3.context;
        }
        if (((token === import17.MdDialogContent) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 5)))) {
            return this._MdDialogContent_4_4.context;
        }
        if (((token === import19.TemplateRef) && (9 === requestNodeIndex))) {
            return this._TemplateRef_9_5;
        }
        if (((token === import20.NgIf) && (9 === requestNodeIndex))) {
            return this._NgIf_9_6.context;
        }
        if (((token === import14.MdPrefixRejector) && ((7 <= requestNodeIndex) && (requestNodeIndex <= 10)))) {
            return this._MdPrefixRejector_7_3.context;
        }
        if (((token === import17.MdDialogActions) && ((7 <= requestNodeIndex) && (requestNodeIndex <= 10)))) {
            return this._MdDialogActions_7_4.context;
        }
        return notFoundResult;
    };
    View_DialogDisplay0.prototype.detectChangesInternal = function (throwOnChange) {
        this._MdPrefixRejector_1_3.ngDoCheck(this, this._el_1, throwOnChange);
        this._MdDialogTitle_1_4.ngDoCheck(this, this._el_1, throwOnChange);
        this._MdPrefixRejector_4_3.ngDoCheck(this, this._el_4, throwOnChange);
        this._MdDialogContent_4_4.ngDoCheck(this, this._el_4, throwOnChange);
        this._MdPrefixRejector_7_3.ngDoCheck(this, this._el_7, throwOnChange);
        this._MdDialogActions_7_4.ngDoCheck(this, this._el_7, throwOnChange);
        var currVal_9_0_0 = this.context.close;
        this._NgIf_9_6.check_ngIf(currVal_9_0_0, throwOnChange, false);
        this._NgIf_9_6.ngDoCheck(this, this._anchor_9, throwOnChange);
        this._vc_9.detectChangesInNestedViews(throwOnChange);
        this._MdDialogTitle_1_4.checkHost(this, this, this._el_1, throwOnChange);
        var currVal_21 = import3.inlineInterpolate(1, '', this.context.title, '');
        if (import3.checkBinding(throwOnChange, this._expr_21, currVal_21)) {
            this.renderer.setText(this._text_2, currVal_21);
            this._expr_21 = currVal_21;
        }
        this._MdDialogContent_4_4.checkHost(this, this, this._el_4, throwOnChange);
        var currVal_22 = import3.inlineInterpolate(1, '', this.context.text, '');
        if (import3.checkBinding(throwOnChange, this._expr_22, currVal_22)) {
            this.renderer.setText(this._text_5, currVal_22);
            this._expr_22 = currVal_22;
        }
        this._MdDialogActions_7_4.checkHost(this, this, this._el_7, throwOnChange);
    };
    View_DialogDisplay0.prototype.destroyInternal = function () {
        this._vc_9.destroyNestedViews();
    };
    View_DialogDisplay0.prototype.createEmbeddedViewInternal = function (nodeIndex) {
        if ((nodeIndex == 9)) {
            return new View_DialogDisplay1(this.viewUtils, this, 9, this._anchor_9, this._vc_9);
        }
        return null;
    };
    return View_DialogDisplay0;
}(import1.AppView));
export { View_DialogDisplay0 };
//# sourceMappingURL=dialog.component.ngfactory.js.map