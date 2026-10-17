import { test, expect } from '@playwright/test'

test('Keyboard Input', async({page}) => {
    await page.goto('/checklist');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    expect(page.getByRole('status')).toHaveText("2 / 5 (40%)")
});

test('checklist page has a title', async ({ page }) => {
       await page.goto('/checklist');
       await expect(page.getByRole('heading', { name: 'Progress Checklist' })).toBeVisible();
   });


test('Click item functions', async({page}) => {
    await page.goto('/checklist');
    expect(page.getByTestId('checkbox-1')).not.toBeChecked();
    await page.getByTestId('checkbox-1').check();
    expect(page.getByTestId('checkbox-1')).toBeChecked();
});

test('Submit function', async({page}) => {
    await page.goto('checklist');
    expect(page.getByTestId('counter')).toHaveText("0 / 5 (0%)")
    await page.getByRole('checkbox', {name: 'Checklist 1'}).check();
    await page.getByRole('checkbox', {name: 'Checklist 2'}).check();
    await page.getByRole('button', {name: 'Submit'}).click();
    expect(page.getByTestId('counter')).toHaveText("2 / 5 (40%)")
});

test('Repeat submissions after changes', async({page}) => {
    await page.goto('checklist');
    expect(page.getByTestId('counter')).toHaveText("0 / 5 (0%)")
    await page.getByTestId('checkbox-1').check();
    await page.getByTestId('checkbox-2').check();
    await page.getByTestId('submit').click();
    expect(page.getByTestId('counter')).toHaveText("2 / 5 (40%)")
    await page.getByTestId('checkbox-2').uncheck();
    await page.getByTestId('checkbox-3').check();
    await page.getByTestId('checkbox-4').check();
    await page.getByTestId('submit').click();
    expect(page.getByTestId('counter')).toHaveText("3 / 5 (60%)")
    await page.getByTestId('checkbox-2').check();
    await page.getByTestId('checkbox-5').check();
    await page.getByTestId('submit').click();
    expect(page.getByTestId('counter')).toHaveText("5 / 5 (100%)")
    await page.getByTestId('checkbox-1').uncheck();
    await page.getByTestId('checkbox-2').uncheck();
    await page.getByTestId('checkbox-3').uncheck();
    await page.getByTestId('checkbox-4').uncheck();
    await page.getByTestId('checkbox-5').uncheck();
    await page.getByTestId('submit').click();
    expect(page.getByTestId('counter')).toHaveText("0 / 5 (0%)")
});

test('Check Progress Bar', async({page}) => {
    await page.goto('checklist');
    await page.getByTestId('checkbox-2').uncheck();
    await page.getByTestId('checkbox-3').check();
    await page.getByTestId('checkbox-4').check();
    await page.getByTestId('submit').click();
    await expect.poll(async() => {
        const val = await page.getByTestId('progressStatic').getAttribute("value");
        return Number(val);
    }).toBe(0.4)
    await expect.poll(async() => {
        const val = await page.getByTestId('progressAnimated').getAttribute("value");
        return Number(val);
    }).toBe(0.4)
});