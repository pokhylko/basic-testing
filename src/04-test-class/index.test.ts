// Uncomment the code below and write your tests
import { InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';

const MY_INITIAL_BALANCE = 1000;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(MY_INITIAL_BALANCE);
    const currentBalance = bankAccount.getBalance();

    expect(currentBalance).toBe(MY_INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const WITHDRAW_AMOUNT = MY_INITIAL_BALANCE + 1000;
    const bankAccount = getBankAccount(MY_INITIAL_BALANCE);

    const result = () => bankAccount.withdraw(WITHDRAW_AMOUNT);

    expect(result).toThrowError(new InsufficientFundsError(MY_INITIAL_BALANCE));
  });

  test('should throw error when transferring more than balance', () => {
    const TRANSFER_AMOUNT = MY_INITIAL_BALANCE + 1000;
    const bankAccount = getBankAccount(MY_INITIAL_BALANCE);
    const anotherAccount = getBankAccount(0);

    const result = () => bankAccount.transfer(TRANSFER_AMOUNT, anotherAccount);

    expect(result).toThrowError(new InsufficientFundsError(MY_INITIAL_BALANCE));
  });

  test('should throw error when transferring to the same account', () => {
    const TRANSFER_AMOUNT = 1000;
    const bankAccount = getBankAccount(MY_INITIAL_BALANCE);

    const result = () => bankAccount.transfer(TRANSFER_AMOUNT, bankAccount);

    expect(result).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const DEPOSIT_AMOUNT = 600;
    const bankAccount = getBankAccount(MY_INITIAL_BALANCE);

    bankAccount.deposit(DEPOSIT_AMOUNT);

    const currentBalance = bankAccount.getBalance();

    expect(currentBalance).toBe(MY_INITIAL_BALANCE + DEPOSIT_AMOUNT);
  });

  test('should withdraw money', () => {
    const WITHDRAW_AMOUNT = 300;
    const bankAccount = getBankAccount(MY_INITIAL_BALANCE);

    bankAccount.withdraw(WITHDRAW_AMOUNT);

    const currentBalance = bankAccount.getBalance();

    expect(currentBalance).toBe(MY_INITIAL_BALANCE - WITHDRAW_AMOUNT);
  });

  test('should transfer money', () => {
    const TRANSFER_AMOUNT = 100;
    const bankAccount = getBankAccount(MY_INITIAL_BALANCE);
    const anotherAccount = getBankAccount(0);

    bankAccount.transfer(TRANSFER_AMOUNT, anotherAccount);

    const currentBalance = bankAccount.getBalance();

    expect(currentBalance).toBe(MY_INITIAL_BALANCE - TRANSFER_AMOUNT);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(MY_INITIAL_BALANCE);

    const currentBalance = await bankAccount.fetchBalance();

    if (currentBalance) {
      expect(typeof currentBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const NEW_BALANCE = 5000;
    const bankAccount = getBankAccount(MY_INITIAL_BALANCE);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(NEW_BALANCE);

    await bankAccount.synchronizeBalance();
    
    const currentBalance = bankAccount.getBalance();

    expect(currentBalance).toBe(NEW_BALANCE);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(MY_INITIAL_BALANCE);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);

    const result = () => bankAccount.synchronizeBalance()

    await expect(result).rejects.toThrowError(SynchronizationFailedError);
  });
});
