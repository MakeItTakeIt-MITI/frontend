export interface Court {
    name: string;
    address: string;
    address_detail: string;
}


export interface GameHostField {
    title: string;
    startdate: string;
    starttime: string;
    enddate: string;
    endtime: string;
    min_invitation: number;
    max_invitation: number;
    info: string;
    fee: number;
    account_bank: string;
    account_holder: string;
    account_number: string;
    court: Court;
}




export interface AddressField {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
}

export interface GameDetailField {
    id: number;
    game_status: string;
    title: string;
    startdate: string;
    starttime: string;
    enddate: string;
    endtime: string;
    fee: number;
    court: Court;
    address: string
}

export interface GameDetailProp {
    gameDetail: {
        data: {
            title: string;
            startdate: string;
            starttime: string;
            enddate: string;
            endtime: string;
            account_bank: string;
            account_holder: string;
            account_number: string;
            fee: number;
            court: {
                address: string;
                address_detail: string;
            };
        };
    };
    handleCloseModal: () => void;
}

export interface PlayerInfo {

    id: number;
    player_name: string;
    player_phone: string;
    player_height: number;
    player_account_holder: string;
    player_account_bank: string;
    player_account_number: string;
    participation_status: string;


}

export interface ParticipantsField {
    id: number;
    data: {
        id: number;
        confirmed: PlayerInfo[]
    }
}

export interface ParticipantsData {
    data: {
        confirmed: ParticipantsField[];
    };
}


export interface ParticipantActionsProps {
    refetch?: () => void;
    participantsData: ParticipantsField;
    phoneFormatter: (arg: string) => string;
}


export interface ModalInviteProp {
    hostName: string;
    titleContextOne: string;
    titleContextTwo: string;
    mainContext: string;
    buttonContextOne: string;
    buttonContextTwo: string;
}



export interface BoxProp {
    titleOne: string;
    titleTwo: string;
    titleOneColor: string;
    titleTwoColor: string;
}

export interface RequestButtonProp {
    textOne: string;
    textTwo: string;
    backgroundColor: string;
    handleRemoveFromGame?: (userId: number) => void;
    handleConfirmToGame?: (userId: number) => void;
    handleCopyClipBoard?: (arg: string) => void;
    userId: number;
}