import AccountService from "../services/account.service.js";

global.fileName = "accounts.json";

async function accountCreate(req, res, next) {
    try {
        let account = req.body;
        if (!account.name || account.balance === null) {
            throw new Error("Nome e Balance são obrigatórios");
        }
        account = await AccountService.createAccount(account);
        res.send(account);
        logger.info(`${req.method} ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}

async function getAccounts(req, res, next) {
    try {
        res.send(JSON.stringify(await AccountService.getAccounts()));
        logger.info(`${req.method} ${req.path}`);
    } catch (err) {
        next(err);
    }
}

async function getAccount(req, res, next) {
    try {
        res.send(await AccountService.getAccount(req.params.id));
        logger.info(`${req.method} id: ${req.params.id}`);
    } catch (err) {
        next(err);
    }
}

async function deleteAccount(req, res, next) {
    try {
        await AccountService.deleteAccount(req.params.id);
        logger.warn(`${req.method} id: ${req.params.id}`);
        res.end();
    } catch (err) {
        next(err);
    }
}

async function updateAccount(req, res, next) {
    try {
        const account = req.body;
        if (!account.id || !account.name || account.balance === null) {
            throw new Error("Id, Name e Balance são obrigatórios.");
        }
        res.send(await AccountService.updateAccount(account));
        logger.info(`${req.method} ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}

async function updateBalance(req, res, next) {
    try {
        const account = req.body;
        if (!account.id || account.balance === null) {
            throw new Error("Id e Balanace são obrigatórios.");
        }
        res.send(await AccountService.updateBalance(account));
        logger.info(`${req.method} ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    accountCreate,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance,
};
