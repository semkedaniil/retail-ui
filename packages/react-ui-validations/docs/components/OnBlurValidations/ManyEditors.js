// @flow
import React from 'react';

import { Input, Button, RadioGroup } from 'ui';

import type {
    ContactInfo,
    ContactInfoValidationInfo,
    FormEditorProps,
} from '../../Domain/ContactInfo';

import Demo from '../Demo/Demo';
import Form from '../Form/Form';

import { ValidationContainer, ValidationWrapperV1, text } from '../../../Commons/Validations';

function FormEditor({ data, validationInfo, onChange }: FormEditorProps): React.Element<*> {
    return (
        <Form>
            <Form.Line title='Имя'>
                <ValidationWrapperV1
                    renderMessage={text()}
                    validationInfo={validationInfo.name}>
                    <Input
                        value={data.name}
                        onChange={(e, value) => onChange({ name: value })}
                    />
                </ValidationWrapperV1>
            </Form.Line>
            <Form.Line title='Email'>
                <ValidationWrapperV1
                    validationInfo={validationInfo.email}>
                    <Input
                        value={data.email}
                        onChange={(e, value) => onChange({ email: value })}
                    />
                </ValidationWrapperV1>
            </Form.Line>
            <Form.Line title='Телефон'>
                <ValidationWrapperV1
                    validationInfo={validationInfo.phone}>
                    <Input
                        value={data.phone}
                        onChange={(e, value) => onChange({ phone: value })}
                    />
                </ValidationWrapperV1>
            </Form.Line>
            <Form.Line title='Пол'>
                <ValidationWrapperV1
                    validationInfo={validationInfo.sex}>
                    <RadioGroup
                        value={data.sex}
                        items={['male', 'female']}
                        renderItem={x => <span>{x}</span>}
                        onChange={(e, value) => onChange({ sex: value })}
                    />
                </ValidationWrapperV1>
            </Form.Line>

            {/*
                Город Combobox
                Вероисповедание Select
                Согласен Checkbox
                DatePicker Дата рождения
                Туда Link
                О себе Textarea
                Согласен Checkbox
            */}
        </Form>
    );
}

function validate(data: ContactInfo): ContactInfoValidationInfo {
    const result = {};
    if (data.name === '') {
        result.name = { type: 'submit', message: 'Имя надо указать' };
    }
    else if (data.name.split(' ').length !== 2) {
        result.name = { message: 'Имя должно состоять из двух слов' };
    }

    if (data.email === '') {
        result.email = { type: 'submit', message: 'Почту надо указать' };
    }
    else if (!data.email.includes('@')) {
        result.email = { message: 'Почта указана неверно' };
    }

    if (data.phone !== '' && !/^[\s\d\-\+\(\)]*$/.test(data.phone)) {
        result.phone = { message: 'Телефон должне состояить только из цифр, пробелов и знаков -,+,(,)' };
    }
    if (!data.sex) {
        result.sex = { type: 'submit', message: 'Надо указать пол' };
    }
    return result;
}

export default class DifferentMessages extends React.Component {
    state = {
        data: {
            name: '',
            email: '',
            phone: '',
            sex: null,
        },
    };

    handleSubmit() {
        this.refs.container.submit();
    }

    render(): React.Element<*> {
        return (
            <div>
                <h1>Валидации по потере фокуса</h1>
                <h4>Демо 1.</h4>
                <p>
                    На этой форме есть валидации по потере фокуса.
                    Имя должно состоять из двух слов и в почте должен быть символ '@'.
                </p>
                <p>Ожидаемое поведение:</p>
                <ul>
                    <li>
                        При нажатии на кнопку Сохранить подсвечиваются невалидные
                        поля, открывается баллун на первом невалидном поле.
                    </li>
                    <li>
                        При редактировании невалидного поля, баллун остётся на
                        месте, а красная подсветка с поля снимается.
                    </li>
                </ul>
                <Demo>
                    <ValidationContainer ref='container'>
                        <FormEditor
                            data={this.state.data}
                            validationInfo={validate(this.state.data)}
                            onChange={update => this.setState({ data: { ...this.state.data, ...update } })}
                        />
                        <Form.ActionsBar>
                            <Button use='primary' onClick={() => this.handleSubmit()}>Сохранить</Button>
                        </Form.ActionsBar>
                    </ValidationContainer>
                </Demo>
            </div>
        );
    }
}
