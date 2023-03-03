use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::set_return_data,
    program_error::ProgramError,
    pubkey::Pubkey,
};

pub enum CounterInstruction {
    Get,
    Increase,
    Decrease,
}

impl CounterInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (&tag, _) = input
            .split_first()
            .ok_or(ProgramError::InvalidInstructionData)?;
        Ok(match tag {
            0 => CounterInstruction::Get,
            1 => CounterInstruction::Increase,
            2 => CounterInstruction::Decrease,
            _ => return Err(ProgramError::InvalidInstructionData),
        })
    }
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct CounterAccount {
    pub counter: u32,
}

impl CounterAccount {
    pub fn get(&self) -> u32 {
        self.counter
    }

    pub fn increase(&mut self) {
        self.counter += 1;
    }

    pub fn decrease(&mut self) {
        self.counter -= 1;
    }
}

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;
    if account.owner != program_id {
        msg!("Incorrect account passed");
        return Err(ProgramError::IncorrectProgramId);
    }
    let mut counter_account = CounterAccount::try_from_slice(&account.data.borrow())?;
    match CounterInstruction::unpack(instruction_data)? {
        CounterInstruction::Get => {
            set_return_data(&account.data.borrow());
            msg!("Data returned, counter is {}", counter_account.get());
        }
        CounterInstruction::Increase => {
            counter_account.increase();
            counter_account.serialize(&mut &mut account.data.borrow_mut()[..])?;
            msg!("Counter increased, counter is {}", counter_account.get());
        }
        CounterInstruction::Decrease => {
            counter_account.decrease();
            counter_account.serialize(&mut &mut account.data.borrow_mut()[..])?;
            msg!("Counter decreased, counter is {}", counter_account.get());
        }
    }
    Ok(())
}
