export const validateName = (Name : string) => {
    if (Name) {
        return true;
    }
    return false;
}

export const validateTrustmanagment = (Trustmanagment : string) => {
    if (parseInt(Trustmanagment)) {
        return true;
    }
    return false;
}

export const validateLength = (Length : string) => {
    if (parseInt(Length)) {
        return true;
    }
    return false;
}

export const validatePaidlength = (Paidlength : string) => {
    if (parseInt(Paidlength)) {
        return true;
    }
    return false;
}

export const validateCategory = (Category : string) => {
    if (Category) {
        return true;
    }
    return false;
}

export const validateNumberofstripes = (Numberofstripes : string) => {
    if (Numberofstripes) {
        return true;
    }
    return false;
}

export const validateSpeed = (Speed : string) => {
    if (parseInt(Speed)) {
        return true;
    }
    return false;
}

export const validatePrice = (Price : string) => {
    if (parseInt(Price)) {
        return true;
    }
    return false;
}

export const validateStartofsection = (Startofsection : string) => {
    if (parseInt(Startofsection)) {
        return true;
    }
    return false;
}

export const validateEndofsection = (Endofsection : string) => {
    if (parseInt(Endofsection)) {
        return true;
    }
    return false;
}





