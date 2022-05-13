import hre, { ethers } from "hardhat";
import {BigNumber} from "ethers";


async function ItemSFT(){
    const [deployer]  = await hre.ethers.getSigners();
    console.log("OWNER ADDRESS ==>> ",deployer.address);

    let _id = 1;

    const ItemContract = await ethers.getContractFactory("ItemSFT");
    const ItemSFT = await ItemContract.deploy(100,deployer.address,_id);


    const TransferSFT = await ethers.getContractFactory("TransferSFT");
    const TransferSFTContract = await TransferSFT.deploy();

    const ItemSFTBalance = BigNumber.from(await ItemSFT.balanceOf(deployer.address,_id)).toNumber();
    const TransferContractBalance = BigNumber.from(await ItemSFT.balanceOf(TransferSFTContract.address,_id)).toNumber();

    console.table({
        "Deployer Balance":ItemSFTBalance,
        "Transfer Contract Balance":TransferContractBalance,
    });



    const approveSFT = await ItemSFT.connect(deployer).setApprovalForAll(TransferSFTContract.address,true);
    const isApprovedSFT = await ItemSFT.connect(deployer).isApprovedForAll(deployer.address,TransferSFTContract.address);

    if(isApprovedSFT){
        const transferSFT = await ItemSFT.connect(deployer).safeTransferFrom(deployer.address,TransferSFTContract.address,_id,10,deployer.address);
        await transferSFT.wait();

        const ItemSFTBalance1 = BigNumber.from(await ItemSFT.balanceOf(deployer.address,_id)).toNumber();
        const TransferContractBalance1 = BigNumber.from(await ItemSFT.balanceOf(TransferSFTContract.address,_id)).toNumber();

        console.table({
            "Deployer Balance":ItemSFTBalance1,
            "Transfer Contract Balance":TransferContractBalance1,
        });

    }else{
        console.log("Not Approved => ", isApprovedSFT);
    }


    const sendFromTransferContract = await TransferSFTContract.TransferToAddress(ItemSFT.address,deployer.address,_id);

    const ItemSFTBalance2 = BigNumber.from(await ItemSFT.balanceOf(deployer.address,_id)).toNumber();
    const TransferContractBalance2 = BigNumber.from(await ItemSFT.balanceOf(TransferSFTContract.address,_id)).toNumber();

    console.table({
        "Deployer Balance":ItemSFTBalance2,
        "Transfer Contract Balance":TransferContractBalance2,
    });


}


ItemSFT().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
