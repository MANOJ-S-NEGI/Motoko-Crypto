import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor DCN {
  let id = "zulot-a7xfy-vnpaf-wjdk6-cujay-vudxh-ltq7i-nzbgm-c2ufu-edivs-4qe";
  let principal:Principal = Principal.fromText(id);
  var walletCoins:Nat = 1000000;
  var symbol:Text = "DCN";

  private stable var balanceEntries : [(Principal, Nat)] = [];
  private  var balanceLeger = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  if (balanceLeger.size() < 1 ){
    balanceLeger.put(principal, walletCoins);
  };

  public query func balanceIn(pId:Principal):async Nat {
    let deCoinNet:Nat = switch(balanceLeger.get(pId))
    {
      case null 0;
      case (?coin) coin;
    };
    return deCoinNet;
  };

  public shared(msg) func bonusCoin() : async Text {
    let anonymous_owner = msg.caller;
    let dcnCoin = 3;
    Debug.print(debug_show(anonymous_owner));
    if (balanceLeger.get(anonymous_owner) == null){
       let result = await transfer(msg.caller, dcnCoin:Nat);
      return result;
    } else { return "Already Claimed" }
  };

  public shared(msg) func transfer(transferTo:Principal, amount:Nat) : async Text {
    let fromWallet = await balanceIn(msg.caller); //if method call another mothod then call retrive actor id rather frontend id
    if (fromWallet >= amount){
      let inWalletLeft:Nat = fromWallet - amount;
      balanceLeger.put(msg.caller, inWalletLeft);
      
      let towardsBalance = await balanceIn(transferTo);
      let inWalletAdd = towardsBalance:Nat + amount:Nat;
      balanceLeger.put(transferTo,inWalletAdd);      
      return "Transfer Successful"

    }else{
      return "Insufficient DCN To Transfer"
      }
  };

  system func preupgrade(){
    balanceEntries := Iter.toArray(balanceLeger.entries());
  };

  system func postupgrade(){
    balanceLeger := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if (balanceLeger.size() < 1) {
      balanceLeger.put(principal, walletCoins);
    };
  };
};