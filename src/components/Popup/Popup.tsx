import React, { Fragment, ReactElement, ReactNode } from 'react';
import style from './Popup.module.css';
import { CloseIcon } from '../../index';
import ReactDOM from 'react-dom';

const appRoot = document.getElementById('root');
const modalRoot = document.getElementById('root');

 class Modal extends React.Component {
    el: HTMLDivElement;
    constructor(props: any) {
        super(props);
        this.el = document.createElement('div');
    }

     componentDidMount() {
         console.log('componentDidMount')
         console.log(document.getElementById('root'))
        modalRoot?.appendChild(this.el);
    }

     componentWillUnmount() {
         console.log('componentWillUnmount')
         console.log(document.getElementById('root'))
        modalRoot?.removeChild(this.el);
    }

     render() {
         console.log('render')
         console.log(modalRoot)
         console.log(document.getElementById('root'))
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}

interface ipopup {
    visible: boolean,
    handleClose: () => void,
    children: ReactNode
}
export default class Overlay extends React.Component<ipopup> {
    constructor(props: ipopup) {
        super(props);
    }
        
    render() {
        return (
            <>
                {
                    this.props.visible &&
                    <Modal>
                        <div className={style.PopupBackground}>
                        </div>
                        <div className={style.PopupDetal} >
                            <div className={style.ClouseButton} onClick={this.props.handleClose} >
                                <CloseIcon type="primary" /></div>
                            <div>
                                {this.props.children}
                            </div>

                        </div>
                    </Modal>
                }
            </>
        );
    } 
}



