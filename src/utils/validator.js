
// Đối tượng 'Validator'
export default function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

     //Hàm thực hiện validate
     function validate(inputElement, rule, errorElement) {
        var errorMessage;
        
        // Lấy ra các rule của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule và kiểm tra
        // Nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    )
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

         if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
            document.querySelector(options.submitBtn).disabled = true;
        } else {
            removeErrorMessage(errorElement, inputElement);
        }

        return !errorMessage;
    }

    function removeErrorMessage(errorElement, inputElement) {
        errorElement.innerText = '';
        getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        document.querySelector(options.submitBtn).disabled = false;
    }
    
    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    var submitBtnElement = document.querySelector(options.submitBtn);
    var selectorRules = {};
    
    if (submitBtnElement) {
        submitBtnElement.onclick = function(e) {
            e.preventDefault();
            
            var isFormValid = true;

             // Lặp qua mỗi rule và xử lý
            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                var isValid = validate(inputElement, rule, errorElement);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            
            if(isFormValid) {
                options.sendOrder();
            }
        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện)
        options.rules.forEach(function(rule) {

            // Lưu lại các rules cho mỗi input 
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function(inputElement) {
                var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                if (inputElement) {
                    // Xử lý trường hợp blur khỏi inout
                    inputElement.onblur = function() {
                        validate(inputElement, rule, errorElement)
                    }
                    // Xử lý mỗi  người dùng nhập input
                    inputElement.oninput = function() {
                        removeErrorMessage(errorElement, inputElement);
                    }
                }
            });
        });
    }
}

// Định nghĩa các rules (phương thức)
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra gì cả
Validator.isRequire = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : message || 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là Email'
        }
    }
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự` ;
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmedValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmedValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }

}