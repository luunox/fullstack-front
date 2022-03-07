/*eslint no-template-curly-in-string: "off"*/

const typeTemplate = "'${name}' no es un ${type} válido";

export const defaultValidateMessages = {
	default: "Validación error en el campo '${name}'",
	required: "'${name}' es requerido",
	enum: "'${name}' tiene que ser uno de estos valores [${enum}]",
	whitespace: "'${name}' no puede estar vacío",
	date: {
		format: "'${name}' es inválido para el formato de fecha",
		parse: "'${name}' no se puede interpretar como fecha",
		invalid: "'${name}' es una fecha inválida",
	},
	types: {
		string: typeTemplate,
		method: typeTemplate,
		array: typeTemplate,
		object: typeTemplate,
		number: typeTemplate,
		date: typeTemplate,
		boolean: typeTemplate,
		integer: typeTemplate,
		float: typeTemplate,
		regexp: typeTemplate,
		email: typeTemplate,
		url: typeTemplate,
		hex: typeTemplate,
	},
	string: {
		len: "'${name}' tiene que tener exactamente ${len} caracteres",
		min: "'${name}' tiene que tener al menos ${min} caracteres",
		max: "'${name}' no puede tener mas de ${max} caracteres",
		range: "'${name}' tiene que tener entre ${min} y ${max} caracteres",
	},
	number: {
		len: "'${name}' tiene que ser igual a ${len}",
		min: "'${name}' no puede ser menor que ${min}",
		max: "'${name}' no puede ser mayor que ${max}",
		range: "'${name}' tiene que estar entre ${min} y ${max}",
	},
	array: {
		len: "'${name}' tiene que ser igual a ${len} en cantidad",
		min: "'${name}' no puede ser menor que ${min} en cantidad",
		max: "'${name}' no puede ser mayor que ${max} en cantidad",
		range: "'${name}' tiene que estar entre ${min} y ${max} en cantidad",
	},
	pattern: {
		mismatch: "'${name}' no coincide con el patrón ${pattern}",
	},
};
