import { expect } from 'chai';
import { describe, test } from 'mocha';

describe('Simple Test', () => {
	test('Hello', () => {
		expect(2 + 2).to.equals(4);
	});
});
